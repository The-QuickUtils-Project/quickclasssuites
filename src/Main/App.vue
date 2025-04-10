<script setup lang="ts">
// @ts-ignore
import { ref } from 'vue';
// @ts-ignore
import MainPage from './components/MainPage.vue';
// @ts-ignore
import OnClass from './components/OnClass.vue';
import clarity from '@microsoft/clarity';
clarity.init('qw5zeanl76')

const components = {
  MainPage,
  OnClass,
};
const currentPage = ref('MainPage');

function changePage() {
  if (currentPage.value === 'MainPage') {
    currentPage.value = 'OnClass';
    window.ipcRenderer.invoke('hot-reload-engine');
  } else {
    currentPage.value = 'MainPage';
    window.ipcRenderer.invoke('hot-reload-engine');
  }
}

function hideWindow() {
  // @ts-ignore
  window.electronApp.hideMainWindow();
}
// const app = document.getElementById('app')
// if(app){
//   useAcrylic(app)
// }

</script>

<template>
  <div id="app">
    <div id="titlebar">
      <div id="Title">
        <p id="maintitle">QuickClass <span id="subtitle">Hub</span></p>
      </div>
      <p id="closebtn" @click="hideWindow">
        
      </p>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="components[currentPage]" @changePage="changePage"></component>
    </transition>
  </div>
</template>

<style scoped lang="less">

:root {
  --theme: #0062FF;
  --background: rgba(0, 0, 0, 0.30);
  --bgBlur: 10px;
}

body,
html {
  border-radius: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(0,0,0,0.40);
  backdrop-filter: 
      blur(30px)
      brightness(120%)
      saturate(80%);
}

#titlebar {
  display: flex;
padding: 22.4px 31.2px;
justify-content: space-between;
align-items: center;
align-self: stretch;
  -webkit-app-region: drag;
}

#Title {
  display: flex;
padding-bottom: 0.4px;
justify-content: center;
align-items: center;
}

#maintitle {
  color: #FFF;
font-family: MiSans;
font-size: 32px;
font-style: normal;
font-weight: 520;
line-height: normal;
}

#subtitle {
  color: var(--theme, #0062FF);
font-family: MiSans;
font-size: 32px;
font-style: normal;
font-weight: 520;
line-height: normal;
}

#icon {
  position: absolute;
  top: 28px;
  left: 38px;
  width: 250px;
  height: 42px;
  -webkit-user-select: none;
  user-select: none;
}

#closebtn {
  width: 33.6px;
  height: 33.6px;
  color: white;
  font-family: 'Segoe MDL2 Assets';
  font-size: 20px;
  -webkit-app-region: no-drag;
  cursor: pointer;
}
</style>
