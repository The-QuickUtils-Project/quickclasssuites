import { app, BrowserWindow, ipcMain, Tray, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
class QuickClass {
  constructor() {
  }
  getConfigItem() {
    return "";
  }
}
const quickClass = new QuickClass();
console.log(quickClass.getConfigItem());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "favicon-64.ico"),
    width: 1440,
    height: 1024,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      if (win) {
        win.hide();
      }
    }
  });
}
let settingsWindow;
function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 495,
    height: 692,
    // parent: win || undefined,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(VITE_DEV_SERVER_URL + "/settings");
  } else {
    settingsWindow.loadFile(path.join(RENDERER_DIST, "settings.html"));
  }
}
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
function createTray() {
  const trayIconPath = path.join(process.env.VITE_PUBLIC, "favicon-64.ico");
  const tray = new Tray(trayIconPath);
  tray.setToolTip("QuickClass Hub");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "启动数据编辑器"
    },
    {
      label: "DevTools",
      click: () => {
        if (win) {
          win.webContents.openDevTools();
          settingsWindow == null ? void 0 : settingsWindow.webContents.openDevTools();
        }
      }
    },
    { label: "设置", click: createSettingsWindow },
    {
      label: "退出",
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
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
    console.error("Error during app initialization:", error);
  }
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
ipcMain.on("hide-main-window", () => {
  if (win) {
    win.hide();
  }
});
ipcMain.on("close-settings-window", () => {
  if (settingsWindow) {
    settingsWindow.close();
    settingsWindow = null;
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
