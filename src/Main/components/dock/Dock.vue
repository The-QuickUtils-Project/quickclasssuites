<template>
    <div id="Dock">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>
<style lang="less">
#Dock {
    display: flex;
    width: 1099px;
    height: 95px;
    padding: 20px 0px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 30px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.15);
}
</style>