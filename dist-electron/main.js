var C = Object.defineProperty;
var w = (i, e, o) => e in i ? C(i, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : i[e] = o;
var f = (i, e, o) => w(i, typeof e != "symbol" ? e + "" : e, o);
import { app as a, BrowserWindow as g, ipcMain as u, dialog as P, Tray as v, Menu as I } from "electron";
import { fileURLToPath as T } from "node:url";
import t from "node:path";
import * as r from "fs";
import * as p from "path";
const b = "classhub";
class y {
  constructor(e) {
    f(this, "configPath");
    const o = process.env.APPDATA || "";
    this.configPath = p.join(o, b, "storage", e);
    const c = p.dirname(this.configPath);
    r.existsSync(c) || r.mkdirSync(c, { recursive: !0 }), r.existsSync(this.configPath) || r.writeFileSync(this.configPath, JSON.stringify({}));
  }
  // 读取配置
  loadConfig() {
    try {
      const e = r.readFileSync(this.configPath, "utf-8");
      return JSON.parse(e);
    } catch (e) {
      return console.error("读取配置失败:", e), {};
    }
  }
  // 获取配置项
  getConfigItem(e) {
    return this.loadConfig()[e];
  }
  // 设置配置项
  setConfigItem(e, o) {
    const c = this.loadConfig();
    c[e] = o, this.saveConfig(c);
  }
  // 删除配置项
  deleteConfigItem(e) {
    const o = this.loadConfig();
    delete o[e], this.saveConfig(o);
  }
  // 保存配置
  saveConfig(e) {
    try {
      r.writeFileSync(this.configPath, JSON.stringify(e, null, 2), "utf-8");
    } catch (o) {
      console.error("保存配置失败:", o);
    }
  }
}
class R {
  constructor() {
    f(this, "configSession");
    this.configSession = new y("config.json");
  }
  getConfigItem(e) {
    const o = this.configSession.getConfigItem(e);
    return o || (console.log("Config item not found"), null);
  }
}
const S = new R(), E = S.getConfigItem("DeveloperSays"), d = t.dirname(T(import.meta.url));
process.env.APP_ROOT = t.join(d, "..");
const l = process.env.VITE_DEV_SERVER_URL, V = t.join(process.env.APP_ROOT, "dist-electron"), h = t.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = l ? t.join(process.env.APP_ROOT, "public") : h;
let n;
function m() {
  n = new g({
    icon: t.join(process.env.VITE_PUBLIC, "favicon-64.ico"),
    width: 1440,
    height: 1024,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: t.join(d, "preload.mjs"),
      nodeIntegration: !1
    }
  }), n.webContents.on("did-finish-load", () => {
    n == null || n.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), l ? n.loadURL(l) : n.loadFile(t.join(h, "index.html")), n.on("close", (i) => {
    a.isQuiting || (i.preventDefault(), n && n.hide());
  }), P.showMessageBox(n, {
    type: "info",
    title: "QuickClass Hub",
    message: "Config module test",
    detail: E,
    buttons: ["确定"]
  });
}
let s;
function _() {
  s = new g({
    width: 495,
    height: 692,
    // parent: win || undefined,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: t.join(d, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !0
    }
  }), l ? s.loadURL(l + "/settings") : s.loadFile(t.join(h, "settings.html"));
}
a.on("activate", () => {
  g.getAllWindows().length === 0 && m();
});
function j() {
  const i = t.join(process.env.VITE_PUBLIC, "favicon-64.ico"), e = new v(i);
  e.setToolTip("QuickClass Hub");
  const o = I.buildFromTemplate([
    {
      label: "启动数据编辑器"
    },
    {
      label: "DevTools",
      click: () => {
        n && (n.webContents.openDevTools(), s == null || s.webContents.openDevTools());
      }
    },
    { label: "设置", click: _ },
    {
      label: "退出",
      click: () => {
        a.isQuiting = !0, a.quit();
      }
    }
  ]);
  e.setContextMenu(o), e.on("click", () => {
    n && (n.isVisible() ? n.hide() : n.show());
  });
}
a.whenReady().then(() => {
  try {
    j(), m();
  } catch (i) {
    console.error("Error during app initialization:", i);
  }
});
process.on("unhandledRejection", (i) => {
  console.error("Unhandled Promise Rejection:", i);
});
process.on("uncaughtException", (i) => {
  console.error("Uncaught Exception:", i);
});
u.on("hide-main-window", () => {
  n && n.hide();
});
u.on("close-settings-window", () => {
  s && (s.close(), s = null);
});
export {
  V as MAIN_DIST,
  h as RENDERER_DIST,
  l as VITE_DEV_SERVER_URL
};
