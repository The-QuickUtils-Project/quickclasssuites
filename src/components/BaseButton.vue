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
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
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
