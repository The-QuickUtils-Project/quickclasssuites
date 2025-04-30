import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...

})

contextBridge.exposeInMainWorld('electronApp', {
  hideMainWindow() {
    ipcRenderer.send('hide-main-window')
  },
})

contextBridge.exposeInMainWorld('resource', {
  getBase64Image: (path: string) => ipcRenderer.invoke('read-image-to-base64', path),
  launchTool: (id: string) => ipcRenderer.invoke('quickclass.engine.hub.dock.extTool.launch', id),
})