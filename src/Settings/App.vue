<script lang="ts" setup>
import QiButton from './assets/buttons/QiButton.vue';
function hideWindow() {
  // @ts-ignore
  window.ipcRenderer.send("close-settings-window");
}
</script>

<template>
    <div id="App">
        <div id="titlebar">
            <div id="title">
                <p id="quickclass">QuickClass</p>
                <p id="setting">设置</p>
            </div>
            <div id="closebtn" @click="hideWindow"></div>
        </div>
        <div id="settings">
            <div id="members-man">
                <p id="members-man-title">班级人员管理</p>
                <div id="mmbtngroup">
                    <QiButton type="button">前往DataEditor</QiButton>
                </div>
            </div>
            <div id="tools-man">
                <p id="tools-man-title">教学工具管理</p>
                <div id="toolsbtngroup">
                    <QiButton type="button">管理</QiButton>
                    <p id="tools-man-tooltip">*后续更新将支持希沃应用的自动检测</p>
                </div>
            </div>
        </div>
    </div>
    
</template>



<style lang="less">
@import url("./assets/styles/Settings.less");

html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden; // 隐藏滚动条
}

#App {
    height: 100%; // 确保根容器占满窗口
    //overflow: hidden; // 防止内容溢出
    // 调试样式
    width: 100%;
    box-sizing: border-box; // 确保宽高包含边框和内边距
}

#settings {
    display: flex;
    flex-direction: column; // 垂直排列子元素
    gap: 16px; // 使用 gap 设置子元素间距
    width: 100%;
    box-sizing: border-box;
}

#members-man, #tools-man {
    margin: 0; // 清除默认外边距
    padding: 20; // 清除默认内边距
    line-height: 1.5; // 调整行高
}

#toolsbtngroup, #mmbtngroup {
    display: flex;
    gap: 8px; // 设置按钮之间的间距
}

p {
    margin: 0; // 清除段落的默认外边距
}
</style>