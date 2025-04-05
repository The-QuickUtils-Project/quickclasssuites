<template>
    <div id="app">
        <div id="titlebar">
            <p id="title">QuickClass <span id="title-name">班级公告</span></p>
            <img id="close_btn" src="./assets/Images/shared/close.png" alt="close" @click="hideWindow" />
        </div>
        <div id="content">
            <div id="toolbar">
                <p id="toolbar-title">公告管理</p>
                <div id="toolbar-btns">
                    <QiButton type="button" id="add-notice">发布新公告</QiButton>
                    <QiButton type="button" :disabled="true" id="delete-notice">管理现有公告</QiButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import QiButton from './assets/QiButton.vue';
// @ts-ignore
import { ref } from 'vue';
function hideWindow() {
    window.ipcRenderer.send("close-noticeman-window");
}

const notices = ref<notices | null>(null);

window.ipcRenderer.invoke('getNoticeList').then((result: notices) => {
    notices.value = result;
    console.log('notices', notices.value);
    if (notices.value && Object.keys(notices.value).length > 0) {
        Object.keys(notices.value).forEach((notice) => {
            const noticeElement = document.createElement('div');
            noticeElement.className = 'notice-item';
            noticeElement.onclick = () => {
                window.ipcRenderer.invoke('open-notice-window');
            };
            noticeElement.innerHTML = `
            <p class="notice-title">
                ${notices.value[notice].title}
            </p>
            <p class="notice-time">
                ${notices.value[notice].date}
            </p>
            <div class="notice-content">
                <p class="notice-contents">${notices.value[notice].content}</p>
            </div>
            `;
            // @ts-ignore
            document.getElementById('content').appendChild(noticeElement);
        });
    }
});
</script>
<style lang="less">
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden; // 隐藏滚动条
    background: var(--Background, #F7F7F7);
}

p {
    margin: 0;
}

#app {
    display: flex;
    width: 100%;
    height: 662px;
    flex-direction: column;
    align-items: center;
    gap: 11px;
    background: #F7F7F7;
}

#titlebar {
    display: flex;
    padding: 22.4px 31.2px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
}

#title {
    color: #000;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
    margin: 0px;
}

#title-name {
    color: var(--Theme, #0062FF);
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
    margin: 0px;
}

#close_btn {
    width: 33.6px;
    height: 33.6px;
    position: absolute;
    right: 39px;
    top: 37.7px;
    -webkit-app-region: no-drag;
    cursor: pointer;
}

#content {
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
}

#toolbar {
    display: flex;
    width: 677px;
    padding: 0px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 11px;
    background: #FFF;
}

#toolbar-title {
    display: flex;
    height: 44px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    color: #AFAFAF;
    font-family: MiSans;
    font-size: 20.4px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#toolbar-btns {
    display: flex;
    padding: 10px;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
}

.notice-item {
    display: flex;
    width: 677px;
    padding: 10px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 12px;
    background: #FFF;
}

.notice-title {
    align-self: stretch;
    color: #000;
    font-family: MiSans;
    font-size: 25px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

.notice-time {
    align-self: stretch;
    color: rgba(0, 0, 0, 0.50);
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
}

.notice-content {
    display: flex;
    padding: 10px;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
}

.notice-contents {
    width: 617px;
    color: #000;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
}
</style>