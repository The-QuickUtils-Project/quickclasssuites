<template>
    <div class="noticeboard">
        <p class="title">班级公告</p>
        <div id="latest_notices"></div>
    </div>
</template>

<script setup>

</script>

<style lang="less">
.title {
    width: 316px;
    color: #000;
    font-family: MiSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
}
.noticeboard{
    display: flex;
    width: 383px;
    height: 543px;
    padding: 20px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 16px;
    background: #FFF;
}

#latest_notices {
    display: flex;
    width: 316px;
    height: 484px;
    padding: 8px;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}
</style>