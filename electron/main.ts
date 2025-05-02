import { app, Tray, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
// import { dialog } from 'electron';
import { fileURLToPath } from 'node:url'
import path from 'node:path';
import { QuickClass } from '../QuickClass/QuickClass';
import { floatMenu } from './floatmenu';
import windowStateKeeper from 'electron-window-state';

let quickClass = new QuickClass();


let extTool = quickClass.extTools;
let noticeBoard = quickClass.Noticeboard;
let OnClass = quickClass.onClassTool;

// 开发/生产模式切换
const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')
console.log('Path:', app.getAppPath)


export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null


//主窗口创建
function createWindow() {
  let winStateKeeper = windowStateKeeper({
    defaultHeight: 1024,
    defaultWidth: 1440
  });

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon-64.ico'),
    width: winStateKeeper.width,
    height: winStateKeeper.height,
    x: winStateKeeper.x,
    y: winStateKeeper.y,
    frame: false,
    // resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false
    },
    transparent: true,
    alwaysOnTop: true
  })
  win.setAlwaysOnTop(true, 'screen-saver')
  winStateKeeper.manage(win)
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
  //const devsays = quickClass.getConfigItem('DeveloperSays');
  // dialog.showMessageBox(win, {
  //   type: 'info',
  //   title: 'QuickClass Hub',
  //   message: 'Config module test',
  //   detail: devsays,
  //   buttons: ['确定']
  // })
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
    settingsWindow.loadURL(VITE_DEV_SERVER_URL + '/settings')
  } else {
    settingsWindow.loadFile(path.join(RENDERER_DIST, 'settings.html'))
  }
}

let noticemanWindow: BrowserWindow | null;
//公告窗口创建
function createNoticeWindow() {
  noticemanWindow = new BrowserWindow({
    width: 919,
    height: 662,
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
    noticemanWindow.loadURL(VITE_DEV_SERVER_URL + '/noticeman')
  } else {
    noticemanWindow.loadFile(path.join(RENDERER_DIST, 'noticeman.html'))
  }
}

ipcMain.handle('noticeboard.Window.open', async () => {
  if (noticemanWindow) {
    noticemanWindow.focus()
  } else {
    createNoticeWindow()
  }
})

ipcMain.handle('noticeboard.Window.close', () => {
  if (noticemanWindow) {
    noticemanWindow.close()
    noticemanWindow = null
  }
})

// OnClass组件Handlers
ipcMain.handle('quickclass.engine.onclass.getData.groups', async () => {
  try {
    const groupsInfo = OnClass.getGroupList();
    console.log('获取分组信息成功:', groupsInfo)
    return groupsInfo;
  } catch (error) {
    console.error('获取班级信息失败:', error)
    return null;
  }
})

ipcMain.handle('quickclass.engine.onclass.getData.students', async () => {
  try {
    const studentsInfo = OnClass.studentList;
    console.log('获取学生信息成功:', studentsInfo)
    return studentsInfo;
  } catch (error) {
    console.error('获取学生信息失败:', error)
    return null;
  }
})

//Random 组件对接
const randomUtil = OnClass.randomStu
ipcMain.handle('quickclass.engine.onclass.tools.random.student', async (_, n) => {
  const result = randomUtil.getRandomStudent(n)
  let resultText = '';
  result.forEach((student) => {
    resultText = resultText + ' ' + student.name;
  })
  // @ts-ignore
  dialog.showMessageBox(win, {
    title: "点名结果",
    type: 'info',
    message: '抽取结果:',
    detail: resultText
  })
})

ipcMain.handle('quickclass.engine.onclass.tools.random.group', async (_, n) => {
  const result = randomUtil.getRandomGroup(n)
  let resultText = '';
  result.forEach((student) => {
    resultText = resultText + ' ' + student.name;
  })
  // @ts-ignore
  dialog.showMessageBox(win, {
    title: "点名结果",
    type: 'info',
    message: '抽取结果:',
    detail: resultText
  })
})

ipcMain.handle('quickclass.engine.onclass.tools.random.groupMember', async (_, n) => {
  const result = randomUtil.getRandomStuInEachGp(n)
  let resultText = '';
  Object.keys(result).forEach((student) => {
    resultText = resultText + ' ' + result[student];
  })
  // @ts-ignore
  dialog.showMessageBox(win, {
    title: "点名结果",
    type: 'info',
    message: '抽取结果:',
    detail: resultText
  })
})

// Rank小组件对接
ipcMain.handle('quickclass.engine.hub.groupRank.get', () => {
  return quickClass.getGroupRank()
})

ipcMain.handle('quickclass.engine.onclass.updateData.groups', async (_, groups) => {
  console.log('[main.ts]Saving updated group data.');
  groups = JSON.parse(groups);
  OnClass.saveGroupStorage(groups);
})

// 文件路径白名单校验
// function validatePath(userPath: string) {
//   const allowedPaths = [
//     path.join(app.getPath('appData'), 'classhub')
//   ]

//   const isValid = allowedPaths.some(allowed => {
//     const relative = path.relative(allowed, userPath)
//     return !relative.startsWith('..') && !path.isAbsolute(relative)
//   })

//   if (!isValid) throw new Error('非法路径访问')
//   return userPath
// }

// Img转base64读取
// ipcMain.handle('read-image-to-base64', async (_, filePath) => {
//   try {
//     // 校验路径合法性并获取buffer
//     const validPath = validatePath(filePath);
//     const buffer = await fs.readFile(validPath)
//     return `data:image/${path.extname(filePath).slice(1)};base64,${buffer.toString('base64')}`
//   } catch (error) {
//     console.error('读取图片失败:', error)
//     return null
//   }
// })

// Dock栏工具
ipcMain.handle('quickclass.engine.hub.dock.extTool.launch', async (_, toolId) => {
  try {
    extTool.startTool(toolId);
  } catch (error) {
    console.error('启动工具失败:', error)
    dialog.showErrorBox('启动外部工具失败', '请检查工具配置或路径是否正确。')
  }
})

ipcMain.handle('quickclass.engine.hub.dock.extTool.getList', async () => {
  try {
    console.log('gotTodoList', extTool.getToolList())
    return extTool.getToolList()
  } catch (error) {
    console.error('获取工具列表失败:', error)
  }
});

ipcMain.handle('getIconBase64', (_, toolId) => {
  try {
    const base64 = extTool.getIconData(toolId);
    return base64;
  } catch (error) {
    console.error('获取工具图标失败:', error)
    return null;
  }
})

ipcMain.handle('getNoticeList', async (_) => {
  try {
    const noticeList = noticeBoard.notices;
    console.log('获取公告列表成功:', noticeList)
    return noticeList;
  } catch (error) {
    console.error('获取公告列表失败:', error)
    return null;
  }
})


//QCE 系统操作

ipcMain.handle('hot-reload-engine', async () => {
  quickClass.reloadEngine();
  extTool = quickClass.extTools;
  noticeBoard = quickClass.Noticeboard;
  OnClass = quickClass.onClassTool;
})

// 并没有什么用的macOS兼容性代码
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('before-quit', ()=>{
  floatMenu_?.saveState()
  
})


// Create Tray icon and context menu
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
          noticemanWindow?.webContents.openDevTools();
        }
      }
    },
    {
      label: '设置', click: () => {
        if (settingsWindow) {
          settingsWindow.focus();
        }
        else {
          createSettingsWindow();
        }
      }
    },
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
      floatMenu_?.isVisible() ? floatMenu_.hide() : floatMenu_?.show();
    }
  });
}

// function getMimeType(filePath: string) {
//   const ext: string = path.extname(filePath).toLowerCase();
//   const mimeTypes = {
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',
//     '.jpeg': 'image/jpeg',
//     '.gif': 'image/gif',
//     '.webp': 'image/webp',
//     '.svg': 'image/svg+xml',
//   };
//   // @ts-ignore
//   return mimeTypes[ext] || 'application/octet-stream';
// }

// protocol.registerSchemesAsPrivileged([
//   {
//     scheme: 'qcres',
//     privileges: {
//       secure: true, // 确保协议是安全的
//       supportFetchAPI: true
//     },
//   },
// ]);

ipcMain.handle('main.MainWindow.show', ()=>{
  win?.isVisible()? win?.hide() : win?.show();
  floatMenu_?.hide()
})
// Init FloatMenu
// Init app
let floatMenu_: floatMenu | null;
app.whenReady().then(() => {
  try {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit(); // 如果有其他实例正在运行，则退出
      return;
    }
    createTray();
    createWindow();
    floatMenu_ = new floatMenu(win, VITE_DEV_SERVER_URL, RENDERER_DIST)
    console.log("Init floatMenu")
    console.log(quickClass.configSession.getConfigItem('archievePath'))
    // protocol.handle('qcres', (request) => {
    //   // 1. 获取请求路径（移除协议和域名）
    //   const url = new URL(request.url)
    //   let requestedPath = path.normalize(url.pathname) // 标准化路径
    //   console.log('gotUrl', url)
    //   // 2. 安全检测：防止路径遍历攻击（如 ../../../etc/passwd）
    //   if (requestedPath.startsWith('..') || requestedPath.includes('/..')) {
    //     return new Response(null, { status: 403 }) // 禁止访问
    //   }
    
    //   const allowedRoot = quickClass.configSession.getConfigItem('archievePath') // 允许访问的根目录
    //   const fullPath = path.join(allowedRoot, requestedPath)
    
    //   // 4. 检查文件是否存在且可读
    //   try {
    //     if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    //       return new Response(null, { status: 404 })
    //     }
    //   } catch (error) {
    //     return new Response(null, { status: 500 })
    //   }
    
    //   const data = fs.readFileSync(fullPath);
    //   return new Response(data, {
    //     headers: {
    //       'Content-Type': getMimeType(fullPath), // 根据扩展名设置 MIME
    //     },
    //   });
    // })
    // @ts-ignore
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // 如果应用已经有窗口打开，聚焦到已打开的窗口
      if (win) {
        if (win.isMinimized()) win.restore();
        win.isVisible() ? win.hide() : win.show();
        win.focus();
      }
    });
    floatMenu_.hide()
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
    floatMenu_?.show()
  }
})

ipcMain.on('close-settings-window', () => {
  if (settingsWindow) {
    settingsWindow.close();
    settingsWindow = null;
  }
})
