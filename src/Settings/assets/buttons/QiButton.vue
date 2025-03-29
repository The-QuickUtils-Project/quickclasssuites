<template>
    <button
      :type="type"
      :disabled="disabled"
      class="base-button"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </button>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    type: {
      type: String,
      default: 'button', // 默认按钮类型
    },
    disabled: {
      type: Boolean,
      default: false, // 默认不禁用
    },
  });
  
  defineEmits(['click']);
  </script>
  
  <style scoped>
  .base-button {
    display: inline-flex;
    height: 50px;
    min-width: 100px;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    color: #FFF;
    font-family: MiSans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: #0062FF;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .base-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .base-button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  </style>
  