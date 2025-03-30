import { app as t, BrowserWindow as c, ipcMain as d, Tray as u, Menu as h } from "electron";
import { fileURLToPath as m } from "node:url";
import o from "node:path";
class w {
  constructor() {
  }
  getConfigItem() {
    return "";
  }
}
const g = new w();
console.log(g.getConfigItem());
const l = o.dirname(m(import.meta.url));
process.env.APP_ROOT = o.join(l, "..");
const s = process.env.VITE_DEV_SERVER_URL, b = o.join(process.env.APP_ROOT, "dist-electron"), a = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? o.join(process.env.APP_ROOT, "public") : a;
let e;
function p() {
  e = new c({
    icon: o.join(process.env.VITE_PUBLIC, "favicon-64.ico"),
    width: 1440,
    height: 1024,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: o.join(l, "preload.mjs"),
      nodeIntegration: !0
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), s ? e.loadURL(s) : e.loadFile(o.join(a, "index.html")), e.on("close", (n) => {
    t.isQuiting || (n.preventDefault(), e && e.hide());
  });
}
let i;
function T() {
  i = new c({
    width: 495,
    height: 692,
    // parent: win || undefined,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: o.join(l, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !0
    }
  }), s ? i.loadURL(s + "/settings") : i.loadFile(o.join(a, "settings.html"));
}
t.on("activate", () => {
  c.getAllWindows().length === 0 && p();
});
function R() {
  const n = o.join(process.env.VITE_PUBLIC, "favicon-64.ico"), r = new u(n);
  r.setToolTip("QuickClass Hub");
  const f = h.buildFromTemplate([
    {
      label: "启动数据编辑器"
    },
    {
      label: "DevTools",
      click: () => {
        e && (e.webContents.openDevTools(), i == null || i.webContents.openDevTools());
      }
    },
    { label: "设置", click: T },
    {
      label: "退出",
      click: () => {
        t.isQuiting = !0, t.quit();
      }
    }
  ]);
  r.setContextMenu(f), r.on("click", () => {
    e && (e.isVisible() ? e.hide() : e.show());
  });
}
t.whenReady().then(() => {
  try {
    R(), p();
  } catch (n) {
    console.error("Error during app initialization:", n);
  }
});
process.on("unhandledRejection", (n) => {
  console.error("Unhandled Promise Rejection:", n);
});
process.on("uncaughtException", (n) => {
  console.error("Uncaught Exception:", n);
});
d.on("hide-main-window", () => {
  e && e.hide();
});
d.on("close-settings-window", () => {
  i && (i.close(), i = null);
});
export {
  b as MAIN_DIST,
  a as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
