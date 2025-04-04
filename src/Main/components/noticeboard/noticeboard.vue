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
                window.ipcRenderer.invoke('open-notice-window');
            };
            noticeElement.innerHTML = `<p id="noticeTitle">${notices.value[notice].title}</p><p id="noticeTime">${notices.value[notice].date}</p>`;
            // @ts-ignore
            document.getElementById('latest_notices').appendChild(noticeElement);
        });
    }
});

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
    margin: 0px;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.notice-item {
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-radius: 16px;
    border: 2px solid #000;
    background: #FFF;
    cursor: pointer;
}

#noticeTitle {
    color: #000;
    text-align: center;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
    margin: 0px;
}

#noticeTime {
    color: rgba(0, 0, 0, 0.50);
    text-align: center;
    font-family: MiSans;
    font-size: 15px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
    margin: 0px;
}

#empty {
    color: #000;
    text-align: center;
    font-family: MiSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 520;
    line-height: normal;
}
</style>