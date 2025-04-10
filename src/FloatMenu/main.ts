// @ts-ignore
import { createApp } from 'vue'
import FloatMenu from './FloatMenu.vue'

createApp(FloatMenu).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
