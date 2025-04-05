var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { app, ipcMain, dialog, BrowserWindow, Tray, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import * as fs from "fs";
import * as path from "path";
import { execFile } from "child_process";
import fs$1 from "node:fs/promises";
const appName$2 = "classhub";
let Config$2 = class Config {
  constructor(fileName) {
    __publicField(this, "configPath");
    const appDataPath = process.env.APPDATA || "";
    this.configPath = path.join(appDataPath, appName$2, "storage", fileName);
    const configDir = path.dirname(this.configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    if (!fs.existsSync(this.configPath)) {
      fs.writeFileSync(this.configPath, JSON.stringify({}));
    }
  }
  // 读取配置
  loadConfig() {
    try {
      const data = fs.readFileSync(this.configPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("读取配置失败:", error);
      return {};
    }
  }
  // 获取配置项
  getConfigItem(key) {
    const config = this.loadConfig();
    return config[key];
  }
  // 设置配置项
  setConfigItem(key, value) {
    const config = this.loadConfig();
    config[key] = value;
    this.saveConfig(config);
  }
  // 删除配置项
  deleteConfigItem(key) {
    const config = this.loadConfig();
    delete config[key];
    this.saveConfig(config);
  }
  // 保存配置
  saveConfig(config) {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("保存配置失败:", error);
    }
  }
};
class Noticeboard {
  constructor() {
    __publicField(this, "notices");
    console.log("Noticeboard initialized");
    const config = new Config$2("noticeboard.json");
    const notices = config.loadConfig();
    console.log("Loaded notices", notices);
    this.notices = notices;
  }
  getNoticeList() {
    const noticeList = Object.keys(this.notices).map((key) => {
      return this.notices[key].title;
    });
    return noticeList;
  }
  getNoticebyId(id) {
    const notice = this.notices[id];
    if (!notice) {
      console.log("Notice not found");
      return null;
    }
    return notice;
  }
}
const appName$1 = "classhub";
let Config$1 = class Config2 {
  constructor(fileName) {
    __publicField(this, "configPath");
    const appDataPath = process.env.APPDATA || "";
    this.configPath = path.join(appDataPath, appName$1, "QuickClassResources", "Tool", fileName);
    const configDir = path.dirname(this.configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    if (!fs.existsSync(this.configPath)) {
      fs.writeFileSync(this.configPath, JSON.stringify({}));
    }
  }
  loadConfig() {
    try {
      const data = fs.readFileSync(this.configPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("读取Tools配置失败:", error);
      return {};
    }
  }
  getConfigItem(key) {
    const config = this.loadConfig();
    return config[key];
  }
  setConfigItem(key, value) {
    const config = this.loadConfig();
    config[key] = value;
    this.saveConfig(config);
  }
  deleteConfigItem(key) {
    const config = this.loadConfig();
    delete config[key];
    this.saveConfig(config);
  }
  saveConfig(config) {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("保存配置失败:", error);
    }
  }
};
function DataLoader$1() {
  const config = new Config$1("extTools.json");
  const toolsData = config.loadConfig();
  return toolsData;
}
function validatePath(userPath) {
  const allowedPaths = [
    path$1.join(app.getPath("appData"), "classhub")
  ];
  const isValid = allowedPaths.some((allowed) => {
    const relative = path$1.relative(allowed, userPath);
    return !relative.startsWith("..") && !path$1.isAbsolute(relative);
  });
  if (!isValid) throw new Error("非法路径访问");
  return userPath;
}
async function read_image_to_base64(filePath) {
  try {
    const validPath = validatePath(filePath);
    const buffer = await fs$1.readFile(validPath);
    const data = `data:image/png;base64,${buffer.toString("base64")}`;
    console.log("ReadImgSuccessful:", data);
    return data;
  } catch (error) {
    console.error("读取图片失败:", error);
    return null;
  }
}
class EduTool {
  constructor() {
    __publicField(this, "tools", {});
    __publicField(this, "toolIconCache", {});
    const toolsData = DataLoader$1();
    this.tools = toolsData;
    Object.keys(this.tools).forEach(async (id) => {
      const base64 = await this.getBase64Icon(id);
      if (base64) {
        this.toolIconCache[id] = base64;
      }
    });
  }
  startTool(id) {
    console.log("Launching tool with ID:", id);
    const tool = this.tools[id];
    if (!tool) {
      console.error("Tool not found:", id);
      return;
    }
    console.log("Tool info:\nTool ID:" + id + "\nTool Name:" + tool.name + "\nTool Path:" + tool.path + "\nTool Description:" + tool.description);
    execFile(tool.path, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error launching tool: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Tool stderr: ${stderr}`);
        return;
      }
      console.log(`Tool stdout: ${stdout}`);
    });
  }
  getToolList() {
    return this.tools;
  }
  getToolInfo(id) {
    const tool = this.tools[id];
    if (!tool) {
      console.error("Tool not found:", id);
      return null;
    }
    return tool;
  }
  async getBase64Icon(id) {
    const tool = this.tools[id];
    if (!tool) {
      console.error("Tool not found:", id);
      return null;
    }
    const appDataPath = process.env.APPDATA || "";
    const iconPath = path$1.join(appDataPath, "classhub", "QuickClassResources", "Tool", "Icons", id + ".png");
    try {
      const base64 = await read_image_to_base64(iconPath);
      if (base64) {
        console.log("[ExtToolHost] ReadImgSuccessful:", base64);
        this.toolIconCache[id] = base64;
        return base64;
      } else {
        console.error("Failed to convert image to base64:", iconPath);
        return null;
      }
    } catch (error) {
      console.error("Error reading image:", error);
      return null;
    }
  }
  getIconData(id) {
    if (this.toolIconCache[id]) {
      return this.toolIconCache[id];
    } else {
      console.error("Icon not found in cache:", id);
      return null;
    }
  }
}
const appName = "classhub";
class Config3 {
  constructor(fileName, initContent = {}) {
    __publicField(this, "configPath");
    const appDataPath = process.env.APPDATA || "";
    this.configPath = path.join(appDataPath, appName, "QuickClassResources", "Archieve", fileName);
    const configDir = path.dirname(this.configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    if (!fs.existsSync(this.configPath)) {
      fs.writeFileSync(this.configPath, JSON.stringify(initContent));
    }
  }
  loadConfig() {
    try {
      const data = fs.readFileSync(this.configPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("读取存档失败:", error);
      return {};
    }
  }
  getConfigItem(key) {
    const config = this.loadConfig();
    return config[key];
  }
  setConfigItem(key, value) {
    const config = this.loadConfig();
    config[key] = value;
    this.saveConfig(config);
  }
  deleteConfigItem(key) {
    const config = this.loadConfig();
    delete config[key];
    this.saveConfig(config);
  }
  saveConfig(config) {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("保存配置失败:", error);
    }
  }
}
function DataLoader() {
  const data = new Config3("classinfo.json", {
    students: {},
    groups: {}
  });
  const classData = data.loadConfig();
  return classData;
}
class UniqueDrawer {
  constructor(students) {
    __publicField(this, "pool");
    __publicField(this, "original");
    this.pool = [...students];
    this.original = [...students];
  }
  // 单次无放回抽取
  drawWithoutReplacement(n) {
    if (n > this.pool.length) throw new Error("Not enough candidates");
    const result = [];
    for (let i = this.pool.length - 1; i >= this.pool.length - n; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.pool[i], this.pool[j]] = [this.pool[j], this.pool[i]];
      result.push(this.pool[i]);
    }
    return result;
  }
  // 重置池
  reset() {
    this.pool = [...this.original];
  }
}
class ClassRandom {
  constructor(studentData) {
    __publicField(this, "students");
    __publicField(this, "groups");
    this.students = studentData.students;
    this.groups = studentData.groups;
  }
  getRandomStudent(n) {
    const studentsUUID = Object.keys(this.students);
    const drawer = new UniqueDrawer(studentsUUID);
    const selectedStudents = drawer.drawWithoutReplacement(n);
    const selectedStudentsData = selectedStudents.map((uuid) => {
      return {
        name: this.students[uuid].name
      };
    });
    return selectedStudentsData;
  }
  getRandomGroup(n) {
    const groupsUUID = Object.keys(this.groups);
    const drawer = new UniqueDrawer(groupsUUID);
    const selectedGroups = drawer.drawWithoutReplacement(n);
    const selectedGroupsData = selectedGroups.map((uuid) => {
      return {
        name: this.groups[uuid].name,
        credit: this.groups[uuid].credit,
        students: this.groups[uuid].students
      };
    });
    return selectedGroupsData;
  }
  getRandomStuInEachGp(n) {
    const groupsUUID = Object.keys(this.groups);
    const groupStudentMap = {};
    groupsUUID.forEach((uuid) => {
      const drawer = new UniqueDrawer(this.groups[uuid].students);
      const selectedStudents = drawer.drawWithoutReplacement(n);
      groupStudentMap[uuid] = selectedStudents.map((studentUUID) => {
        return this.students[studentUUID].name;
      });
    });
    return groupStudentMap;
  }
}
let OnClass$1 = class OnClass {
  constructor() {
    __publicField(this, "studentData");
    __publicField(this, "studentList");
    __publicField(this, "groupList");
    __publicField(this, "randomStu");
    this.studentData = DataLoader();
    this.studentList = this.studentData.students;
    this.groupList = this.studentData.groups;
    console.log("groups", this.groupList);
    this.randomStu = new ClassRandom(this.studentData);
  }
  getStudentList(groupId) {
    if (groupId) {
      return this.groupList[groupId].students;
    }
    return Object.keys(this.studentList);
  }
  getGroupList() {
    return this.groupList;
  }
  getStudentInfo(studentId) {
    const student = this.studentList[studentId];
    if (!student) {
      console.log("Student not found");
      return null;
    }
    return student;
  }
  getGroupInfo(groupId) {
    const group = this.groupList[groupId];
    if (!group) {
      console.log("Group not found");
      return null;
    }
    return group;
  }
  getStudentGroup(studentId) {
    const student = this.studentList[studentId];
    if (!student) {
      console.log("Student not found");
      return null;
    }
    return student.group;
  }
  saveGroupData() {
  }
};
class QuickClass {
  constructor() {
    __publicField(this, "configSession");
    __publicField(this, "onClassTool");
    __publicField(this, "Noticeboard");
    __publicField(this, "extTools");
    this.configSession = new Config$2("config.json");
    this.Noticeboard = new Noticeboard();
    this.extTools = new EduTool();
    this.onClassTool = new OnClass$1();
  }
  getConfigItem(key) {
    const content = this.configSession.getConfigItem(key);
    if (!content) {
      console.log("Config item not found");
      return null;
    }
    return content;
  }
}
const quickClass = new QuickClass();
const extTool = quickClass.extTools;
const noticeBoard = quickClass.Noticeboard;
const OnClass2 = quickClass.onClassTool;
const __dirname = path$1.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "favicon-64.ico"),
    width: 1440,
    height: 1024,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs"),
      nodeIntegration: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
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
      preload: path$1.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(VITE_DEV_SERVER_URL + "/settings");
  } else {
    settingsWindow.loadFile(path$1.join(RENDERER_DIST, "settings.html"));
  }
}
let noticemanWindow;
function createNoticeWindow() {
  noticemanWindow = new BrowserWindow({
    width: 919,
    height: 662,
    // parent: win || undefined,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    noticemanWindow.loadURL(VITE_DEV_SERVER_URL + "/noticeman");
  } else {
    noticemanWindow.loadFile(path$1.join(RENDERER_DIST, "noticeman.html"));
  }
}
ipcMain.handle("open-notice-window", async () => {
  if (noticemanWindow) {
    noticemanWindow.focus();
  } else {
    createNoticeWindow();
  }
});
ipcMain.on("close-noticeman-window", () => {
  if (noticemanWindow) {
    noticemanWindow.close();
    noticemanWindow = null;
  }
});
ipcMain.handle("getGroupsInfo", async () => {
  try {
    const groupsInfo = OnClass2.getGroupList();
    console.log("获取分组信息成功:", groupsInfo);
    return groupsInfo;
  } catch (error) {
    console.error("获取班级信息失败:", error);
    return null;
  }
});
ipcMain.handle("getStudentsInfo", async () => {
  try {
    const studentsInfo = OnClass2.studentList;
    console.log("获取学生信息成功:", studentsInfo);
    return studentsInfo;
  } catch (error) {
    console.error("获取学生信息失败:", error);
    return null;
  }
});
const randomUtil = OnClass2.randomStu;
ipcMain.handle("getRandomStudent", async (_, n) => {
  const result = randomUtil.getRandomStudent(n);
  let resultText = "";
  result.forEach((student) => {
    resultText = resultText + " " + student.name;
  });
  dialog.showMessageBox(win, {
    title: "点名结果",
    type: "info",
    message: "抽取结果:",
    detail: resultText
  });
});
ipcMain.handle("getRandomGroup", async (_, n) => {
  const result = randomUtil.getRandomGroup(n);
  let resultText = "";
  result.forEach((student) => {
    resultText = resultText + " " + student.name;
  });
  dialog.showMessageBox(win, {
    title: "点名结果",
    type: "info",
    message: "抽取结果:",
    detail: resultText
  });
});
ipcMain.handle("getRandomGroupMember", async (_, n) => {
  const result = randomUtil.getRandomStuInEachGp(n);
  let resultText = "";
  Object.keys(result).forEach((student) => {
    resultText = resultText + " " + result[student];
  });
  dialog.showMessageBox(win, {
    title: "点名结果",
    type: "info",
    message: "抽取结果:",
    detail: resultText
  });
});
ipcMain.handle("launch-tool", async (_, toolId) => {
  try {
    extTool.startTool(toolId);
  } catch (error) {
    console.error("启动工具失败:", error);
    dialog.showErrorBox("启动外部工具失败", "请检查工具配置或路径是否正确。");
  }
});
ipcMain.handle("getToolList", async () => {
  try {
    console.log("gotTodoList", extTool.getToolList());
    return extTool.getToolList();
  } catch (error) {
    console.error("获取工具列表失败:", error);
  }
});
ipcMain.handle("getIconBase64", (_, toolId) => {
  try {
    const base64 = extTool.getIconData(toolId);
    return base64;
  } catch (error) {
    console.error("获取工具图标失败:", error);
    return null;
  }
});
ipcMain.handle("getNoticeList", async (_) => {
  try {
    const noticeList = noticeBoard.notices;
    console.log("获取公告列表成功:", noticeList);
    return noticeList;
  } catch (error) {
    console.error("获取公告列表失败:", error);
    return null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
function createTray() {
  const trayIconPath = path$1.join(process.env.VITE_PUBLIC, "favicon-64.ico");
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
          noticemanWindow == null ? void 0 : noticemanWindow.webContents.openDevTools();
        }
      }
    },
    {
      label: "设置",
      click: () => {
        if (settingsWindow) {
          settingsWindow.focus();
        } else {
          createSettingsWindow();
        }
      }
    },
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
