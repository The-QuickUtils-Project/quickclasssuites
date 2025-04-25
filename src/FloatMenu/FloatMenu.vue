<template>
    <div id="FloatMenu">
        <img src="./floatMenu.svg" alt="" @click="()=>{}"/>
    </div>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron';

function onMenuClicker() {
    ipcRenderer.invoke
}
</script>

<style lang="less">
body,
html {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    overflow: hidden;
}

#FloatMenu {
    display: inline-flex;
    // padding: 11px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #F7F7F7;
    -webkit-user-select: none;
    user-select: none;
    -webkit-app-region: drag;
}

#textContainer {
    width: 40px;
    height: 228px;
}

#text {
    transform: rotate(90deg);
    color: #000;
    font-family: MiSans;
    font-size: 30px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#text-hub {
    color: #0062FF;
    font-family: MiSans;
    font-size: 30px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}
</style>
