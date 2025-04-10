"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("electronApp", {
  hideMainWindow() {
    electron.ipcRenderer.send("hide-main-window");
  }
});
electron.contextBridge.exposeInMainWorld("resource", {
  getBase64Image: (path) => electron.ipcRenderer.invoke("read-image-to-base64", path),
  launchTool: (id) => electron.ipcRenderer.invoke("launch-tool", id)
});
