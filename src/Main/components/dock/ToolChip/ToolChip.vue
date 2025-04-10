<template>
    <div id="ToolChip" @click="props.toolAction">
        <slot class="tool-icon"></slot>
        <p class="tool-name">{{ props.toolName }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    toolName: {
        type: String,
        required: true
    },
    toolAction: {
        type: Function,
        required: false
    }
})
</script>

<style lang="less">
@import url(../../widgets_global.less);
#ToolChip {
    box-sizing: border-box;
    display: flex;
    width: 88px;
    padding: 13px;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    border-radius: 7px;
    cursor: pointer;
}

.tool-icon {
    box-sizing: border-box;
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.tool-name {
    box-sizing: border-box;
    width: 100%;
    color: var(--Text);
    text-align: center;
    font-family: MiSans;
    font-size: 15px;
    font-style: normal;
    font-weight: 380;
    line-height: normal;
    margin: 0px;
}
</style>