<template>
    <div id="GroupRank">
        <p id="title">小组积分榜</p>
        <div id="ranklist"></div>
    </div>
</template>
<script setup lang="ts"></script>
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
#ranklist {
    display: flex;
    width: 100%;
    height: 204.8px;
    padding: 8px;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}
</style>