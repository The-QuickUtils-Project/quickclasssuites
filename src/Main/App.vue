<script setup lang="ts">

</script>

<template>
  <div id="app">
    <div id="titlebar">
      <img alt="quickclass-icon" id="icon" src="./assets/svgicon.svg" />
      <img id="close_btn" src="./assets/Images/shared/close.png" alt="close"/>
    </div>
  </div>
</template>

<style scoped>
body, html{
  background-color: #F7F7F7;
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
  gap: 51px;
  background-color: #F7F7F7;
  overflow: hidden;
}

#titlebar {
  width: 100%;
  height: 110px;
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
}
</style>
