<template>
    <div class="noticeboard">
        <p class="title">班级公告</p>
        <div id="latest_notices" :style="listStyle">
            <p id="empty">暂无公告</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { ref } from 'vue';
const listStyle = ref('justify-content: center;')
const notices = ref<notices | null>(null);

window.ipcRenderer.invoke('getNoticeList').then((result: notices) => {
    notices.value = result;
    console.log('notices', notices.value);
    if (notices.value && Object.keys(notices.value).length > 0) {
        listStyle.value = 'justify-content: flex-start;';
        Object.keys(notices.value).forEach((notice) => {
            document.getElementById('empty')?.remove();
            const noticeElement = document.createElement('div');
            noticeElement.className = 'notice-item';
            noticeElement.onclick = () => {
                window.ipcRenderer.invoke('noticeboard.Window.open');
            };
            noticeElement.innerHTML = `<p class="noticeTitle">${notices.value[notice].title}</p><p class="noticeTime">${notices.value[notice].date}</p><p class="noticeContent">${notices.value[notice].content}</p>`;
            // @ts-ignore
            document.getElementById('latest_notices').appendChild(noticeElement);
        });
    }
});

</script>

<style lang="less">
@import url(../../assets/styles/Dark/MainPage/Widgets/noticeboard.vue.less);
</style>