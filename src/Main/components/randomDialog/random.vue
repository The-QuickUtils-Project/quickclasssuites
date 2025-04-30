<template>
    <Teleport to="body">
        <div v-if="show" class="modal">
            <div id="titlebar">
                <p id="title">随机点名</p>
                <img id="close-button" src="./Close.png" @click="handleClose" />
            </div>

            <div id="current-mode">
                <p id="current-mode-t">模式:</p>
                <select id="mode-select" v-model="currentMode_">
                    <option value="group">小组</option>
                    <option value="groupMember">每组抽取</option>
                    <option value="student">学生</option>
                </select>
            </div>
            <div id="editAmount">
                <div id="editAmountArea">
                    <div class="btn" @click="handleDecrease">
                        <p>−</p>
                    </div>
                    <div id="amount">
                        <p>{{ currentAmount }}</p>
                    </div>
                    <div class="btn" @click="handleIncrease">
                        <p>+</p>
                    </div>
                </div>
                <button id="start" @click="handleConfirmed">开始</button>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    currentMode: {
        type: String,
        default: 'student'
    }
})

const currentAmount = ref(1);

const currentMode_ = ref(props.currentMode)
watch(
    () => props.currentMode,
    (newVal: any) => {
        currentMode_.value = newVal;
    }
);
console.log('CurrentMode', props.currentMode)
const emit = defineEmits(['closeRandomDialog']);

const handleClose = () => {
    emit('closeRandomDialog')
}

const handleDecrease = () => {
    if (currentAmount.value > 1){
        currentAmount.value--
    }
}

const handleIncrease = () => {
    currentAmount.value++
}

const handleConfirmed = () => {
    if(currentMode_.value === 'student'){
        window.ipcRenderer.invoke('quickclass.engine.onclass.tools.random.student', currentAmount.value)
    }else if(currentMode_.value === 'group'){
        window.ipcRenderer.invoke('quickclass.engine.onclass.tools.random.group', currentAmount.value)
    }else if(currentMode_.value === 'groupMember'){
        window.ipcRenderer.invoke('quickclass.engine.onclass.tools.random.groupMember', currentAmount.value)
    }
}
</script>

<style lang="less" scoped>
.modal {
    z-index: 9999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 居中对齐 */
    display: flex;
    width: 511px;
    height: 266px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    background: #F7F7F7;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
}

#titlebar {
    display: flex;
    height: 70px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
}

#title {
    color: #000;
    font-family: MiSans;
    font-size: 25px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#close-button {
    width: 18.816px;
    height: 18.816px;
    aspect-ratio: 18.82/18.82;
    cursor: pointer;
}

#current-mode {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    align-self: stretch;
}

#mode-select {
    width: 200px;
    height: 34px;
    border-radius: 5px;
    background: #FFF;
    border: 1px solid #CCC;
    outline: none;
    padding: 5px;
    font-family: MiSans;
    font-size: 16px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
    cursor: pointer;
}

#mode-select:hover {
    border-color: #0062FF;
}

#current-mode {
    display: flex;
    padding: 0px 30px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
}

#current-mode-t {
    color: #000;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#editAmount {
    display: flex;
    height: 142px;
    padding: 10px 30px;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    align-self: stretch;
}

#editAmountArea {
    box-sizing: border-box;
    display: flex;
    width: 285px;
    height: 58px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.btn {
    display: flex;
    width: 50px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}

.btn p {
    color: #000;
    font-family: MiSans;
    font-size: 25px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
    margin: 0px;
}

#amount {
    display: flex;
    width: 50px;
    height: 50px;
    padding: 11px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

#amount p {
    color: #000;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#start {
    display: flex;
    width: 84px;
    height: 42px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #0062FF;
    border: none;
    color: #FFF;
    font-family: MiSans;
    font-size: 16px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
}

#start:hover {
    background: #0052CC;
}
</style>