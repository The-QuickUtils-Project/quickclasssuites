<template>
    <div class="main-page">
       <noticeboard /> 
       <div id="rightArea">
            <ClassSchedule />
            <GroupRank />
       </div>
       <Dock>
        <ToolChip toolName="开始上课" :toolAction="startClass">
            <img src="./dock/assets/startclass.svg" />
        </ToolChip>
       </Dock>
    </div>
</template>

<script setup>
import noticeboard from './noticeboard/noticeboard.vue';
import ClassSchedule from './classschedule/ClassSchedule.vue';
import GroupRank from './grouprank/GroupRank.vue';
import Dock from './dock/Dock.vue';
import ToolChip from './dock/ToolChip/ToolChip.vue';
const props = defineProps();
function startClass() {
    window.resource.launchTool('com.seewo.easinote')
}
</script>

<style scoped>
.main-page {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    gap: 20px 10px;
    align-self: stretch;
    flex-wrap: wrap;
}

#rightArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>