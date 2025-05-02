<template>
    <div class="main-page">
        <div id="widgets">
            <noticeboard />
            <div id="rightArea">
                <ClassSchedule />
                <GroupRank />
            </div>
        </div>
        <Dock>
            <ToolChip toolName="开始上课" :toolAction="startClass">
                <img src="./dock/assets/startclass.svg" alt="上课" />
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
    </div>
</template>

<script setup lang="ts">
import noticeboard from './noticeboard/noticeboard.vue';
import ClassSchedule from './classschedule/ClassSchedule.vue';
import GroupRank from './grouprank/GroupRank.vue';
import Dock from './dock/Dock.vue';
import ToolChip from './dock/ToolChip/ToolChip.vue';
// @ts-ignore
import { ref, reactive } from 'vue';
const emit = defineEmits(['changePage']);
function startClass() {
    // window.resource.launchTool('com.seewo.easinote')
    emit('changePage')
}

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

</script>

<style lang="less" scoped>
@import url(../assets/styles/Dark/MainPage/MainPage.vue.less);
</style>