var U = Object.defineProperty;
var G = (n, e, t) => e in n ? U(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => G(n, typeof e != "symbol" ? e + "" : e, t);
import { app as g, ipcMain as u, dialog as v, BrowserWindow as I, protocol as O, Tray as F, Menu as A } from "electron";
import { fileURLToPath as M } from "node:url";
import r from "node:path";
import * as l from "fs";
import * as m from "path";
import { execFile as B } from "child_process";
import V from "node:fs/promises";
import j from "node:fs";
const $ = "classhub";
let S = class {
  constructor(e) {
    a(this, "configPath");
    const t = process.env.APPDATA || "";
    this.configPath = m.join(t, $, "storage", e);
    const o = m.dirname(this.configPath);
    l.existsSync(o) || l.mkdirSync(o, { recursive: !0 }), l.existsSync(this.configPath) || l.writeFileSync(this.configPath, JSON.stringify({}));
  }
  // 读取配置
  loadConfig() {
    try {
      const e = l.readFileSync(this.configPath, "utf-8");
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
  setConfigItem(e, t) {
    const o = this.loadConfig();
    o[e] = t, this.saveConfig(o);
  }
  // 删除配置项
  deleteConfigItem(e) {
    const t = this.loadConfig();
    delete t[e], this.saveConfig(t);
  }
  // 保存配置
  saveConfig(e) {
    try {
      l.writeFileSync(this.configPath, JSON.stringify(e, null, 4), "utf-8");
    } catch (t) {
      console.error("保存配置失败:", t);
    }
  }
}, R = class {
  constructor(e, t = {}) {
    a(this, "configPath");
    a(this, "config");
    this.config = new S("config.json");
    const o = this.config.getConfigItem("archievePath");
    let s = "";
    o === "" || o === void 0 ? (s = m.join(g.isPackaged ? m.dirname(process.execPath) : g.getAppPath(), "archieve"), console.warn("Using default archieve path, when the software updates, the archieve might lost.")) : s = o, this.configPath = m.join(s, "QuickClass", "Archieve", e);
    const c = m.dirname(this.configPath);
    l.existsSync(c) || l.mkdirSync(c, { recursive: !0 }), l.existsSync(this.configPath) || l.writeFileSync(this.configPath, JSON.stringify(t));
  }
  loadConfig() {
    try {
      const e = l.readFileSync(this.configPath, "utf-8");
      return JSON.parse(e);
    } catch (e) {
      return console.error("读取存档失败:", e), {};
    }
  }
  getConfigItem(e) {
    return this.loadConfig()[e];
  }
  setConfigItem(e, t) {
    const o = this.loadConfig();
    o[e] = t, this.saveConfig(o);
  }
  deleteConfigItem(e) {
    const t = this.loadConfig();
    delete t[e], this.saveConfig(t);
  }
  saveConfig(e) {
    try {
      l.writeFileSync(this.configPath, JSON.stringify(e, null, 2), "utf-8");
    } catch (t) {
      console.error("保存配置失败:", t);
    }
  }
};
class x {
  constructor() {
    a(this, "notices");
    console.log("Noticeboard initialized");
    const t = new R("noticeboard.json").loadConfig();
    console.log("Loaded notices", t), this.notices = t;
  }
  getNoticeList() {
    return Object.keys(this.notices).map((t) => this.notices[t].title);
  }
  getNoticebyId(e) {
    const t = this.notices[e];
    return t || (console.log("Notice not found"), null);
  }
}
class J {
  constructor(e) {
    a(this, "configPath");
    a(this, "config");
    this.config = new S("config.json");
    const t = this.config.getConfigItem("archievePath");
    let o = "";
    t === "" || t === void 0 ? (o = m.join(g.isPackaged ? m.dirname(process.execPath) : g.getAppPath(), "archieve"), console.warn("Using default archieve path, when the software updates, the archieve might lost.")) : o = t, this.configPath = m.join(o, "QuickClass", "Tools", e);
    const s = m.dirname(this.configPath);
    l.existsSync(s) || l.mkdirSync(s, { recursive: !0 }), l.existsSync(this.configPath) || l.writeFileSync(this.configPath, JSON.stringify({}));
  }
  loadConfig() {
    try {
      const e = l.readFileSync(this.configPath, "utf-8");
      return JSON.parse(e);
    } catch (e) {
      return console.error("读取Tools配置失败:", e), {};
    }
  }
  getConfigItem(e) {
    return this.loadConfig()[e];
  }
  setConfigItem(e, t) {
    const o = this.loadConfig();
    o[e] = t, this.saveConfig(o);
  }
  deleteConfigItem(e) {
    const t = this.loadConfig();
    delete t[e], this.saveConfig(t);
  }
  saveConfig(e) {
    try {
      l.writeFileSync(this.configPath, JSON.stringify(e, null, 2), "utf-8");
    } catch (t) {
      console.error("保存配置失败:", t);
    }
  }
}
function Q() {
  return new J("extTools.json").loadConfig();
}
function W(n) {
  const t = new S("config.json").getConfigItem("archievePath");
  let o = "";
  if (t === "" || t === void 0 ? (o = r.join(g.isPackaged ? r.dirname(process.execPath) : g.getAppPath(), "archieve"), console.warn("Using default archieve path, when the software updates, the archieve might lost.")) : o = t, ![
    r.join(o)
  ].some((h) => {
    const f = r.relative(h, n);
    return !f.startsWith("..") && !r.isAbsolute(f);
  })) throw new Error("非法路径访问");
  return n;
}
async function q(n) {
  try {
    const e = W(n), o = `data:image/png;base64,${(await V.readFile(e)).toString("base64")}`;
    return console.log("ReadImgSuccessful:", o), o;
  } catch (e) {
    return console.error("读取图片失败:", e), null;
  }
}
class z {
  constructor() {
    a(this, "tools", {});
    a(this, "toolIconCache", {});
    const e = Q();
    this.tools = e, Object.keys(this.tools).forEach(async (t) => {
      const o = await this.getBase64Icon(t);
      o && (this.toolIconCache[t] = o);
    });
  }
  startTool(e) {
    console.log("Launching tool with ID:", e);
    const t = this.tools[e];
    if (!t) {
      console.error("Tool not found:", e);
      return;
    }
    console.log(`Tool info:
Tool ID:` + e + `
Tool Name:` + t.name + `
Tool Path:` + t.path + `
Tool Description:` + t.description), B(t.path, (o, s, c) => {
      if (o) {
        console.error(`Error launching tool: ${o.message}`);
        return;
      }
      if (c) {
        console.error(`Tool stderr: ${c}`);
        return;
      }
      console.log(`Tool stdout: ${s}`);
    });
  }
  getToolList() {
    return this.tools;
  }
  getToolInfo(e) {
    const t = this.tools[e];
    return t || (console.error("Tool not found:", e), null);
  }
  async getBase64Icon(e) {
    if (!this.tools[e])
      return console.error("Tool not found:", e), null;
    const s = new S("config.json").getConfigItem("archievePath");
    let c = "";
    s === "" || s === void 0 ? (c = r.join(g.isPackaged ? r.dirname(process.execPath) : g.getAppPath(), "archieve"), console.warn("Using default archieve path, when the software updates, the archieve might lost.")) : c = s;
    const h = r.join(c, "QuickClass", "Tools", "Icons", e + ".png");
    try {
      const f = await q(h);
      return f ? (console.log("[ExtToolHost] ReadImgSuccessful:", f), this.toolIconCache[e] = f, f) : (console.error("Failed to convert image to base64:", h), null);
    } catch (f) {
      return console.error("Error reading image:", f), null;
    }
  }
  getIconData(e) {
    return this.toolIconCache[e] ? this.toolIconCache[e] : (console.error("Icon not found in cache:", e), null);
  }
}
function H() {
  return new R("classinfo.json", {
    students: {},
    groups: {}
  }).loadConfig();
}
function K(n, e) {
  new R("classinfo.json", {
    students: {},
    groups: {}
  }).setConfigItem(e, n), console.log("Save data successfully");
}
class L {
  constructor(e) {
    a(this, "pool");
    a(this, "original");
    this.pool = [...e], this.original = [...e];
  }
  // 单次无放回抽取
  drawWithoutReplacement(e) {
    if (e > this.pool.length) throw new Error("Not enough candidates");
    const t = [];
    for (let o = this.pool.length - 1; o >= this.pool.length - e; o--) {
      const s = Math.floor(Math.random() * (o + 1));
      [this.pool[o], this.pool[s]] = [this.pool[s], this.pool[o]], t.push(this.pool[o]);
    }
    return t;
  }
  // 重置池
  reset() {
    this.pool = [...this.original];
  }
}
class X {
  constructor(e) {
    a(this, "students");
    a(this, "groups");
    this.students = e.students, this.groups = e.groups;
  }
  getRandomStudent(e) {
    const t = Object.keys(this.students);
    return new L(t).drawWithoutReplacement(e).map((h) => ({
      name: this.students[h].name
    }));
  }
  getRandomGroup(e) {
    const t = Object.keys(this.groups);
    return new L(t).drawWithoutReplacement(e).map((h) => ({
      name: this.groups[h].name,
      point: this.groups[h].point,
      students: this.groups[h].students
    }));
  }
  getRandomStuInEachGp(e) {
    const t = Object.keys(this.groups), o = {};
    return t.forEach((s) => {
      const h = new L(this.groups[s].students).drawWithoutReplacement(e);
      o[s] = h.map((f) => this.students[f].name);
    }), o;
  }
}
let E = class {
  constructor() {
    a(this, "studentData");
    a(this, "studentList");
    a(this, "groupList");
    a(this, "randomStu");
    this.studentData = H(), this.studentList = this.studentData.students, this.groupList = this.studentData.groups, console.log("groups", this.groupList), this.randomStu = new X(this.studentData);
  }
  getStudentList(e) {
    return e ? this.groupList[e].students : Object.keys(this.studentList);
  }
  getGroupList() {
    return this.groupList;
  }
  getStudentInfo(e) {
    const t = this.studentList[e];
    return t || (console.log("Student not found"), null);
  }
  getGroupInfo(e) {
    const t = this.groupList[e];
    return t || (console.log("Group not found"), null);
  }
  getStudentGroup(e) {
    const t = this.studentList[e];
    return t ? t.group : (console.log("Student not found"), null);
  }
  saveGroupStorage(e) {
    K(e, "groups");
  }
};
function k(n) {
  return Object.values(n).sort((o, s) => s.point - o.point).reduce((o, s) => (o[s.name] = s.point, o), {});
}
class Y {
  constructor() {
    a(this, "configSession");
    a(this, "onClassTool");
    a(this, "Noticeboard");
    a(this, "extTools");
    a(this, "grouprank");
    console.log("QuickClass Engine v25.3"), this.configSession = new S("config.json"), this.configSession.getConfigItem("archievePath"), this.Noticeboard = new x(), this.extTools = new z(), this.onClassTool = new E(), this.grouprank = k;
  }
  getConfigItem(e) {
    const t = this.configSession.getConfigItem(e);
    return t || (console.log("Config item not found"), null);
  }
  getGroupRank() {
    const e = this.onClassTool.groupList;
    return k(e);
  }
  reloadEngine() {
    console.log("Reloading QCE Classes"), this.configSession = new S("config.json"), this.Noticeboard = new x(), this.onClassTool = new E(), console.log("Reloaded");
  }
}
let w = new Y(), y = w.extTools, N = w.Noticeboard, P = w.onClassTool;
const T = r.dirname(M(import.meta.url));
process.env.APP_ROOT = r.join(T, "..");
console.log("Path:", g.getAppPath);
const C = process.env.VITE_DEV_SERVER_URL, fe = r.join(process.env.APP_ROOT, "dist-electron"), b = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = C ? r.join(process.env.APP_ROOT, "public") : b;
let i;
function _() {
  i = new I({
    icon: r.join(process.env.VITE_PUBLIC, "favicon-64.ico"),
    width: 1440,
    height: 1024,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: r.join(T, "preload.mjs"),
      nodeIntegration: !1
    },
    transparent: !0
  }), i.webContents.on("did-finish-load", () => {
    i == null || i.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), C ? i.loadURL(C) : i.loadFile(r.join(b, "index.html")), i.on("close", (n) => {
    g.isQuiting || (n.preventDefault(), i && i.hide());
  });
}
let d;
function Z() {
  d = new I({
    width: 495,
    height: 692,
    // parent: win || undefined,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: r.join(T, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !0
    }
  }), C ? d.loadURL(C + "/settings") : d.loadFile(r.join(b, "settings.html"));
}
let p;
function ee() {
  p = new I({
    width: 919,
    height: 662,
    // parent: win || undefined,
    frame: !1,
    resizable: !1,
    webPreferences: {
      preload: r.join(T, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !0
    }
  }), C ? p.loadURL(C + "/noticeman") : p.loadFile(r.join(b, "noticeman.html"));
}
u.handle("open-notice-window", async () => {
  p ? p.focus() : ee();
});
u.on("close-noticeman-window", () => {
  p && (p.close(), p = null);
});
u.handle("getGroupsInfo", async () => {
  try {
    const n = P.getGroupList();
    return console.log("获取分组信息成功:", n), n;
  } catch (n) {
    return console.error("获取班级信息失败:", n), null;
  }
});
u.handle("getStudentsInfo", async () => {
  try {
    const n = P.studentList;
    return console.log("获取学生信息成功:", n), n;
  } catch (n) {
    return console.error("获取学生信息失败:", n), null;
  }
});
const D = P.randomStu;
u.handle("getRandomStudent", async (n, e) => {
  const t = D.getRandomStudent(e);
  let o = "";
  t.forEach((s) => {
    o = o + " " + s.name;
  }), v.showMessageBox(i, {
    title: "点名结果",
    type: "info",
    message: "抽取结果:",
    detail: o
  });
});
u.handle("getRandomGroup", async (n, e) => {
  const t = D.getRandomGroup(e);
  let o = "";
  t.forEach((s) => {
    o = o + " " + s.name;
  }), v.showMessageBox(i, {
    title: "点名结果",
    type: "info",
    message: "抽取结果:",
    detail: o
  });
});
u.handle("getRandomGroupMember", async (n, e) => {
  const t = D.getRandomStuInEachGp(e);
  let o = "";
  Object.keys(t).forEach((s) => {
    o = o + " " + t[s];
  }), v.showMessageBox(i, {
    title: "点名结果",
    type: "info",
    message: "抽取结果:",
    detail: o
  });
});
u.handle("getRank", () => w.getGroupRank());
u.handle("updateGroupStorage", async (n, e) => {
  console.log("[main.ts]Saving updated group data."), e = JSON.parse(e), P.saveGroupStorage(e);
});
u.handle("launch-tool", async (n, e) => {
  try {
    y.startTool(e);
  } catch (t) {
    console.error("启动工具失败:", t), v.showErrorBox("启动外部工具失败", "请检查工具配置或路径是否正确。");
  }
});
u.handle("getToolList", async () => {
  try {
    return console.log("gotTodoList", y.getToolList()), y.getToolList();
  } catch (n) {
    console.error("获取工具列表失败:", n);
  }
});
u.handle("getIconBase64", (n, e) => {
  try {
    return y.getIconData(e);
  } catch (t) {
    return console.error("获取工具图标失败:", t), null;
  }
});
u.handle("getNoticeList", async (n) => {
  try {
    const e = N.notices;
    return console.log("获取公告列表成功:", e), e;
  } catch (e) {
    return console.error("获取公告列表失败:", e), null;
  }
});
u.handle("hot-reload-engine", async () => {
  w.reloadEngine(), y = w.extTools, N = w.Noticeboard, P = w.onClassTool;
});
g.on("activate", () => {
  I.getAllWindows().length === 0 && _();
});
function te() {
  const n = r.join(process.env.VITE_PUBLIC, "favicon-64.ico"), e = new F(n);
  e.setToolTip("QuickClass Hub");
  const t = A.buildFromTemplate([
    {
      label: "启动数据编辑器"
    },
    {
      label: "DevTools",
      click: () => {
        i && (i.webContents.openDevTools(), d == null || d.webContents.openDevTools(), p == null || p.webContents.openDevTools());
      }
    },
    {
      label: "设置",
      click: () => {
        d ? d.focus() : Z();
      }
    },
    {
      label: "退出",
      click: () => {
        g.isQuiting = !0, g.quit();
      }
    }
  ]);
  e.setContextMenu(t), e.on("click", () => {
    i && (i.isVisible() ? i.hide() : i.show());
  });
}
function oe(n) {
  const e = r.extname(n).toLowerCase();
  return {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml"
  }[e] || "application/octet-stream";
}
O.registerSchemesAsPrivileged([
  {
    scheme: "qcres",
    privileges: {
      secure: !0,
      // 确保协议是安全的
      supportFetchAPI: !0
    }
  }
]);
g.whenReady().then(() => {
  try {
    if (!g.requestSingleInstanceLock()) {
      g.quit();
      return;
    }
    te(), _(), console.log(w.configSession.getConfigItem("archievePath")), O.handle("qcres", (e) => {
      const t = new URL(e.url);
      let o = r.normalize(t.pathname);
      if (console.log("gotUrl", t), o.startsWith("..") || o.includes("/.."))
        return new Response(null, { status: 403 });
      const s = w.configSession.getConfigItem("archievePath"), c = r.join(s, o);
      try {
        if (!j.existsSync(c) || !j.statSync(c).isFile())
          return new Response(null, { status: 404 });
      } catch {
        return new Response(null, { status: 500 });
      }
      const h = j.readFileSync(c);
      return new Response(h, {
        headers: {
          "Content-Type": oe(c)
          // 根据扩展名设置 MIME
        }
      });
    }), g.on("second-instance", (e, t, o) => {
      i && (i.isMinimized() && i.restore(), i.isVisible() ? i.hide() : i.show(), i.focus());
    });
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
u.on("hide-main-window", () => {
  i && i.hide();
});
u.on("close-settings-window", () => {
  d && (d.close(), d = null);
});
export {
  fe as MAIN_DIST,
  b as RENDERER_DIST,
  C as VITE_DEV_SERVER_URL
};
