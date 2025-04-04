<template>
    <div id="onclassView">
        <div id="StudentView">

        </div>
        <Dock>
            <ToolChip toolName="下课" :toolAction="() => {
                emit('changePage')
            }">
                <img src="./dock/assets/startclass.png" alt="下课" />
            </ToolChip>
            <ToolChip toolName="随机" :toolAction="() => { }">
                <img src="./dock/assets/random.png" alt="随机点名" />
            </ToolChip>
            <ToolChip></ToolChip>
        </Dock>
        <Credit :show="credit_dialog_visible" :current-credit="current_credit" :groupId="current_group" @closeCreditDialog="closeCreditDialog" @confirmCredit="onConfirmCredit">
        </Credit>
    </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref } from 'vue';
import Dock from './dock/Dock.vue';
import ToolChip from './dock/ToolChip/ToolChip.vue';
// @ts-ignore
import Credit from './grouprank/Credit.vue';
const emit = defineEmits(['changePage']);
const groups = ref<groups | null>(null);
const students = ref<students | null>(null);
window.ipcRenderer.invoke('getStudentsInfo').then((result: students) => {
    students.value = result;
    console.log('students', students.value);
});

const credit_dialog_visible = ref(false);
const current_credit = ref(0);
const current_group = ref('0');
const showCreditDialog = () => {
    credit_dialog_visible.value = true;
};
// showCreditDialog()
// @ts-ignore
function onGroupCardClick(groupId: string) {
    console.log('onGroupCardClick', groupId);
    if (groups.value && groups.value[groupId]) {
        current_group.value = groupId;
        current_credit.value = groups.value[groupId].credit;
        showCreditDialog();
    } else {
        console.error('Group not found:', groupId);
    }
};

function onConfirmCredit(data: { groupId: string; credit: number }) {
    console.log('onConfirmCredit', data.groupId, data.credit);
    if (groups.value && groups.value[data.groupId]) {
        groups.value[data.groupId].credit = data.credit;
        // 这里可以添加更新UI的逻辑
        console.log('Updated group credit:', groups.value[data.groupId]);
    } else {
        console.error('Group not found:', data.groupId);
    }
}

const closeCreditDialog = () => {
    credit_dialog_visible.value = false;
};

// const credit_dialog = document.createElement('div');
// credit_dialog.innerHTML = `
// <Credit></Credit>
// `;
// document.getElementById('onclassView')?.appendChild(credit_dialog);

window.ipcRenderer.invoke('getGroupsInfo').then((result: groups) => {
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
                const studentCard = document.createElement('div');
                studentCard.className = 'group-card-member';
                studentCard.innerHTML = `
                <div class="group-card-member-avatar-container">
                    <img src="${students.value[studentId].avatar}" style="" class="group-card-member-avatar" alt="${students.value[studentId].name}" />
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

</script>

<style lang="less">
// ::-webkit-scrollbar {
//     width: 1px;
// }
#onclassView {
    display: flex;
    height: 692px;
    flex-direction: column;
    align-items: center;
    gap: 21px;
    flex-shrink: 0;
    align-self: stretch;
}

#StudentView {
    display: flex;
    width: 1152px;
    height: 542px;
    padding-bottom: 88px;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}

.group-card {
    display: flex;
    padding: 10px;
    width: 100%;
    height: 222px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-radius: 16px;
    background: #FFF;
}

.group-card-name {
    color: #000;
    text-align: center;
    font-family: MiSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
    cursor: pointer;
}

.group-card-member-container {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    overflow-x: auto;
    overflow-y: hidden;
}

.group-card-member {
    display: flex;
    width: 120px;
    height: 140px;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.group-card-member-name {
    color: #000;
    text-align: center;
    font-family: MiSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
}

.group-card-member-avatar-container {
    display: flex;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.group-card-member-avatar {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    background: lightgray 50% / cover no-repeat;
    border-radius: 1000px;
}
</style>