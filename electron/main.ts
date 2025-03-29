import { app, Tray, BrowserWindow, Menu, ipcMain } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { QuickClass } from '../QuickClass/QuickClass'

const quickClass = new QuickClass();
console.log(quickClass.getConfigItem());

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null


//主窗口创建
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon-64.ico'),
    width: 1440,
    height: 1024,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  win.on('close', (event) => {
    // @ts-ignore
    if (!app.isQuiting) { // 检查是否正在退出
      event.preventDefault()
      if (win) {
        win.hide();
      }
    }
  })
}

let settingsWindow: BrowserWindow | null;
//设置窗口创建
function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 495,
    height: 692,
    // parent: win || undefined,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  if (VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(VITE_DEV_SERVER_URL+'/settings')
  } else {
    settingsWindow.loadFile(path.join(RENDERER_DIST, 'settings.html'))
  }
}



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



function createTray() {
  const trayIconPath = path.join(process.env.VITE_PUBLIC, 'favicon-64.ico'); // 确保路径正确
  const tray = new Tray(trayIconPath); // 使用完整路径
  tray.setToolTip('QuickClass Hub');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '启动数据编辑器'
    },
    {
      label: 'DevTools',
      click: () => {
        if (win) {
          win.webContents.openDevTools();
          settingsWindow?.webContents.openDevTools();
        }
      }
    },
    { label: '设置', click: createSettingsWindow },
    { 
      label: '退出', 
      click: () => {
        // @ts-ignore
        app.isQuiting = true; // 标记应用正在退出
        app.quit(); // 退出应用
      } 
    }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (win) {
      win.isVisible() ? win.hide() : win.show();
    }
  });
}

app.whenReady().then(() => {
  try {
    createTray();
    createWindow();
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
});

// 添加全局未捕获异常处理
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

ipcMain.on('hide-main-window', () => {
  if (win) {
    win.hide();
  }
})

ipcMain.on('close-settings-window', () => {
  if (settingsWindow) {
    settingsWindow.close();
    settingsWindow = null;
  }
})
