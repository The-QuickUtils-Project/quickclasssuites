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
@import url(./assets/styles/Dark/App.vue.less);
</style>
