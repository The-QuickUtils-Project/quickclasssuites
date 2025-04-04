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
  if(currentPage.value === 'MainPage') {
    currentPage.value = 'OnClass';
  } else {
    currentPage.value = 'MainPage';
  }
}

function hideWindow() {
  // @ts-ignore
  window.electronApp.hideMainWindow();
}
</script>

<template>
  <div id="app">
    <div id="titlebar">
      <img alt="quickclass-icon" id="icon" src="./assets/svgicon.svg" />
      <img id="close_btn" src="./assets/Images/shared/close.png" alt="close" @click="hideWindow"/>
    </div>
    <component :is="components[currentPage]" @changePage="changePage"></component>
  </div>
</template>

<style scoped>
body, html{
  border-radius: 16px;
  background: var(--Background, #F7F7F7);
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
  background: var(--Background, #F7F7F7);
  overflow: hidden;
}

#titlebar {
  width: 100%;
  max-height: 110px;
  -webkit-app-region: drag;
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

#close_btn {
  width: 33.6px;
  height: 33.6px;
  position: absolute;
  right: 39px;
  top: 37.7px;
  -webkit-app-region: no-drag;
  cursor: pointer;
}
</style>
