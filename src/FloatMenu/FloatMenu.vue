<template>
    <div id="dragArea"></div>
    <div id="FloatMenu">
        <img src="./floatMenu.svg" alt="" @click="()=>{showMainWin()}"/>
    </div>
</template>

<script lang="ts" setup>
function showMainWin(){
    window.ipcRenderer.invoke('main.MainWindow.show')
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
#dragArea {
    z-index: 999;
    position: absolute;
    left: 0px;
    top: 0px;
    -webkit-app-region: drag;
    width: 60px;
    height: 20px;
}

#FloatMenu {
    display: inline-flex;
    // padding: 11px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #F7F7F7;
    //-webkit-user-select: none;
    //user-select: none;
    //-webkit-app-region: drag;
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
