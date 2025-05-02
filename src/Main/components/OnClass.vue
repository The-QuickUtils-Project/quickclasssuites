<template>
    <div id="onclassView">
        <div id="container">
            <div id="StudentView">

            </div>
        </div>

        <Dock>
            <ToolChip toolName="下课" :toolAction="() => {
                emit('changePage')
            }">
                <img src="./dock/assets/startclass.png" alt="下课" />
            </ToolChip>
            <ToolChip toolName="随机" :toolAction="() => { showRandomDialog() }">
                <img src="./dock/assets/random.png" alt="随机点名" />
            </ToolChip>
            <div style="width: 6px;height: 100px;flex-shrink: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="96" viewBox="0 0 6 96" fill="none">
                    <path d="M3 12L3 83" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>
            <ToolChip v-if="tools" :key="index" :toolName="info.name" :toolAction="() => startTool(id)"
                v-for="(info, id, index) in tools as Record<string, ToolInfo>">
                <img :src="toolIcons[id]" :alt="info.name" />
            </ToolChip>
        </Dock>
        <point :show="point_dialog_visible" :currentpoint="current_point" :groupId="current_group"
            @closepointDialog="closepointDialog" @confirmpoint="onConfirmpoint">
        </point>
        <Random :show="randomDialogVisible" @closeRandomDialog="closeRandomDialog"></Random>
    </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref } from 'vue';
import Dock from './dock/Dock.vue';
import ToolChip from './dock/ToolChip/ToolChip.vue';
// @ts-ignore
import point from './grouprank/point.vue';
import Random from './randomDialog/random.vue';
const emit = defineEmits(['changePage']);
const groups = ref<groups | null>(null);
const students = ref<students | null>(null);
window.ipcRenderer.invoke('quickclass.engine.onclass.getData.students').then((result: students) => {
    students.value = result;
    console.log('students', students.value);
});

const point_dialog_visible = ref(false);
const current_point = ref(0);
const current_group = ref('0');
const showpointDialog = () => {
    point_dialog_visible.value = true;
};
// showpointDialog()
// @ts-ignore
function onGroupCardClick(groupId: string) {
    console.log('onGroupCardClick', groupId);
    if (groups.value && groups.value[groupId]) {
        current_group.value = groupId;
        current_point.value = groups.value[groupId].point;
        showpointDialog();
    } else {
        console.error('Group not found:', groupId);
    }
};

function onConfirmpoint(data: { groupId: string; point: number }) {
    console.log('onConfirmpoint', data.groupId, data.point);
    if (groups.value && groups.value[data.groupId]) {
        groups.value[data.groupId].point = Number(data.point);
        console.log('groupValue', groups.value)
        const groupsData = groups.value;
        window.ipcRenderer.invoke('quickclass.engine.onclass.updateData.groups', JSON.stringify(groupsData));
        console.log('Updated group point:', groups.value[data.groupId]);
    }else{
        console.error('Group not found:', data.groupId);
    }
}

const closepointDialog = () => {
    point_dialog_visible.value = false;
};

// const point_dialog = document.createElement('div');
// point_dialog.innerHTML = `
// <point></point>
// `;
// document.getElementById('onclassView')?.appendChild(point_dialog);

window.ipcRenderer.invoke('quickclass.engine.onclass.getData.groups').then((result: groups) => {
    groups.value = result;
    console.log('groups', groups.value);
    if (groups.value && Object.keys(groups.value).length > 0) {
        Object.keys(groups.value).forEach((groupId) => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.innerHTML = `
            <p class="group-card-name">
                ${groups.value[groupId].name}
            </p>
            <div class="group-card-member-container">
            </div>
            `;
            const groupCardMemberContainer = document.createElement('div');
            groupCardMemberContainer.className = 'group-card-member-container';
            groupCard.appendChild(groupCardMemberContainer);

            // 添加点击事件监听
            const groupCardName = groupCard.querySelector('.group-card-name');
            groupCardName?.addEventListener('click', () => {
                onGroupCardClick(groupId); // 调用点击事件处理函数
            });

            // 添加成员信息
            const studentList: string[] = groups.value[groupId].students;
            studentList.forEach((studentId) => {
                let avatarurl = students.value[studentId].avatar;
                if(avatarurl === "" || !avatarurl){
                    avatarurl = "https://img.icons8.com/fluency/96/student-male.png"
                }
                const studentCard = document.createElement('div');
                studentCard.className = 'group-card-member';
                studentCard.innerHTML = `
                <div class="group-card-member-avatar-container">
                    <img src="${avatarurl}" style="" class="group-card-member-avatar" alt="${students.value[studentId].name}" />
                </div>
                <p class="group-card-member-name">${students.value[studentId].name}</p>
                `;
                groupCardMemberContainer.appendChild(studentCard);
            });

            // 将 groupCard 添加到 StudentView 中
            document.getElementById('StudentView')?.appendChild(groupCard);
        });
    }
});

// 加载工具
interface ToolInfo {
    name: string;
    path: string;
    description: string;
}

const tools = ref<Record<string, ToolInfo> | null>(null);
const toolIcons = ref<Record<string, string>>({});

window.ipcRenderer.invoke('quickclass.engine.hub.dock.extTool.getList').then((result: Record<string, ToolInfo>) => {
    console.log('ToolList', result);
    tools.value = result;
    loadToolIcons();
});


function startTool(id: string) {
    window.ipcRenderer.invoke('quickclass.engine.hub.dock.extTool.launch', id)
}


async function loadToolIcons() {
    if (!tools.value) return;
    for (const id of Object.keys(tools.value)) {
        const base64Icon = await window.ipcRenderer.invoke('getIconBase64', id);
        toolIcons.value[id] = base64Icon;
        console.log('gotIcon', id, base64Icon);
        console.log('tools', toolIcons.value);
    }
}


// 随机抽取
const randomDialogVisible = ref(false)

function showRandomDialog() {
    randomDialogVisible.value = true
}

function closeRandomDialog() {
    randomDialogVisible.value = false
}

</script>

<style lang="less">
@import url(../assets/styles/Dark/OnClass/OnClass.vue.less);
</style>