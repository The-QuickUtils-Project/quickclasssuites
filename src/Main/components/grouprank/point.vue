<template>
    <Teleport to="body">
        <div v-if="show" class="modal">
            <div id="titlebar">
                <p id="title">积分</p>
                <img id="close-button" src="./Close.png" @click="handleClose" />
            </div>

            <div id="current-point">
                <p id="current-point-content">当前积分: {{ currentpoint_ }}</p>
            </div>
            <div id="editpoint">
                <p id="editpoint-title">加分</p>
                <div id="editpoint-input">
                    <input type="text" placeholder="请输入积分" />
                    <button id="confirm-button" @click="onConfirm">确认</button>
                </div>
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
    currentpoint: Number,
    groupId: String,
})
const currentpoint_ = ref(props.currentpoint)
watch(
    () => props.currentpoint,
    (newVal: any) => {
        currentpoint_.value = newVal;
    }
);
console.log('Current point', props.currentpoint)
const emit = defineEmits(['closepointDialog', 'confirmpoint']);
function onConfirm() {
    console.log('Confirm clicked', props.groupId, props.currentpoint);
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if(input.value != ''){
        const pointValue = parseInt(input.value, 10);
        // 直接使用 props.currentpoint
        const updatedpoint = (currentpoint_.value) + pointValue;
        console.log('Updated point value:', updatedpoint);
        currentpoint_.value = updatedpoint
        emit('confirmpoint', {
            groupId: props.groupId,
            point: updatedpoint, // 将更新后的积分传递给父组件
        });
    }
    
}

const handleClose = () => {
    emit('closepointDialog')
}
</script>

<style lang="less">
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

#current-point {
    display: flex;
    padding: 0px 30px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    color: #000;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#editpoint {
    display: flex;
    height: 149px;
    padding: 10px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    align-self: stretch;
}

#editpoint-title {
    color: #000;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 450;
    line-height: normal;
}

#editpoint-input {
    display: flex;
    height: 34px;
    padding-right: 3px;
    justify-content: center;
    align-items: flex-start;
    gap: 21px;
    flex-shrink: 0;
}

#editpoint-input input {
    width: 258px;
    height: 34px;
    border-radius: 5px;
    background: #FFF;
    border: none;
    outline: none;
}

#editpoint-input button {
    display: flex;
    height: 34px;
    width: 84px;
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

#editpoint-input button:hover {
    background: #0052CC;
}
</style>