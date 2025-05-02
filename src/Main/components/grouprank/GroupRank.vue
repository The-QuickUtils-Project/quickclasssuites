<template>
    <div id="GroupRank">
        <p id="title">小组积分榜</p>
        <div id="ranklist"></div>
    </div>
</template>
<script setup lang="ts">
interface RankObj {
    [name: string]: number
}

window.ipcRenderer.invoke('quickclass.engine.hub.groupRank.get').then((rank: RankObj) => {
    console.log("rankContent", rank)
    Object.keys(rank).forEach((name) => {
        const rankChip = document.createElement('div');
        rankChip.className = 'rankChip';
        rankChip.innerHTML = `
        <p class="groupName">${name}</p>
        <p class="pointNum">${rank[name]}<span class="pointUnit">Points</span></p>
        `
        document.getElementById('ranklist')?.appendChild(rankChip)
    })
})
</script>
<style lang="less">
@import url(../../assets/styles/Dark/MainPage/Widgets/GroupRank.vue.less);
</style>