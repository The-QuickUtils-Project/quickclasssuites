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

window.ipcRenderer.invoke('getRank').then((rank: RankObj) => {
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
#GroupRank {
    display: flex;
    height: 284.8px;
    box-sizing: border-box;
    padding: 20px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 16px;
    background: #FFF;
}

p {
    margin: 0px;
}

::-webkit-scrollbar {
    width: 0px;
}

#ranklist {
    display: flex;
    width: 100%;
    height: 204.8px;
    padding: 8px;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    overflow-y: scroll;
}

.rankChip {
    display: flex;
    height: 35px;
    padding: 0px 30px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
}

.groupName {
    color: #000;
    text-align: center;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
}

.pointNum {
    color: #000;
    text-align: center;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
}

.pointUnit {
    color: #000;
font-family: MiSans;
font-size: 15px;
font-style: normal;
font-weight: 250;
line-height: normal;
}
</style>