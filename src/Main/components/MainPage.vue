<template>
    <div class="main-page">
       <noticeboard /> 
       <div id="rightArea">
            <ClassSchedule />
       </div>
    </div>
</template>

<script setup>
import noticeboard from './noticeboard/noticeboard.vue';
import ClassSchedule from './classschedule/ClassSchedule.vue';
const props = defineProps();
</script>

<style scoped>
.main-page {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    gap: 49px 40px;
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