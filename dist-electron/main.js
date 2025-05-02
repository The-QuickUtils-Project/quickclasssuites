var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import require$$1, { app, BrowserWindow, ipcMain, dialog, Tray, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path$3 from "node:path";
import * as fs$1 from "fs";
import fs__default from "fs";
import * as path$2 from "path";
import path__default from "path";
import { execFile } from "child_process";
import fs$2 from "node:fs/promises";
import require$$0 from "constants";
import require$$0$1 from "stream";
import require$$4 from "util";
import require$$5 from "assert";
const appName = "classhub";
let Config$2 = class Config {
  constructor(fileName) {
    __publicField(this, "configPath");
    const appDataPath = process.env.APPDATA || "";
    this.configPath = path$2.join(appDataPath, appName, "storage", fileName);
    const configDir = path$2.dirname(this.configPath);
    if (!fs$1.existsSync(configDir)) {
      fs$1.mkdirSync(configDir, { recursive: true });
    }
    if (!fs$1.existsSync(this.configPath)) {
      fs$1.writeFileSync(this.configPath, JSON.stringify({}));
    }
  }
  // 读取配置
  loadConfig() {
    try {
      const data = fs$1.readFileSync(this.configPath, "utf-8");
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
      fs$1.writeFileSync(this.configPath, JSON.stringify(config, null, 4), "utf-8");
    } catch (error) {
      console.error("保存配置失败:", error);
    }
  }
};
let Config$1 = class Config2 {
  constructor(fileName, initContent = {}) {
    __publicField(this, "configPath");
    __publicField(this, "config");
    this.config = new Config$2("config.json");
    const configStoragePath = this.config.getConfigItem("archievePath");
    let archievePath = "";
    if (configStoragePath === "" || configStoragePath === void 0) {
      archievePath = path$2.join(app.isPackaged ? path$2.dirname(process.execPath) : app.getAppPath(), "archieve");
      console.warn("Using default archieve path, when the software updates, the archieve might lost.");
    } else {
      archievePath = configStoragePath;
    }
    this.configPath = path$2.join(archievePath, "QuickClass", "Archieve", fileName);
    const configDir = path$2.dirname(this.configPath);
    if (!fs$1.existsSync(configDir)) {
      fs$1.mkdirSync(configDir, { recursive: true });
    }
    if (!fs$1.existsSync(this.configPath)) {
      fs$1.writeFileSync(this.configPath, JSON.stringify(initContent));
    }
  }
  loadConfig() {
    try {
      const data = fs$1.readFileSync(this.configPath, "utf-8");
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
      fs$1.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("保存配置失败:", error);
    }
  }
};
class Noticeboard {
  constructor() {
    __publicField(this, "notices");
    console.log("Noticeboard initialized");
    const config = new Config$1("noticeboard.json");
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
class Config3 {
  constructor(fileName) {
    __publicField(this, "configPath");
    __publicField(this, "config");
    this.config = new Config$2("config.json");
    const configStoragePath = this.config.getConfigItem("archievePath");
    let archievePath = "";
    if (configStoragePath === "" || configStoragePath === void 0) {
      archievePath = path$2.join(app.isPackaged ? path$2.dirname(process.execPath) : app.getAppPath(), "archieve");
      console.warn("Using default archieve path, when the software updates, the archieve might lost.");
    } else {
      archievePath = configStoragePath;
    }
    this.configPath = path$2.join(archievePath, "QuickClass", "Tools", fileName);
    const configDir = path$2.dirname(this.configPath);
    if (!fs$1.existsSync(configDir)) {
      fs$1.mkdirSync(configDir, { recursive: true });
    }
    if (!fs$1.existsSync(this.configPath)) {
      fs$1.writeFileSync(this.configPath, JSON.stringify({}));
    }
  }
  loadConfig() {
    try {
      const data = fs$1.readFileSync(this.configPath, "utf-8");
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
      fs$1.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("保存配置失败:", error);
    }
  }
}
function DataLoader$1() {
  const config = new Config3("extTools.json");
  const toolsData = config.loadConfig();
  return toolsData;
}
function validatePath(userPath) {
  const config = new Config$2("config.json");
  const configStoragePath = config.getConfigItem("archievePath");
  let archievePath = "";
  if (configStoragePath === "" || configStoragePath === void 0) {
    archievePath = path$3.join(app.isPackaged ? path$3.dirname(process.execPath) : app.getAppPath(), "archieve");
    console.warn("Using default archieve path, when the software updates, the archieve might lost.");
  } else {
    archievePath = configStoragePath;
  }
  const allowedPaths = [
    path$3.join(archievePath)
  ];
  const isValid = allowedPaths.some((allowed) => {
    const relative = path$3.relative(allowed, userPath);
    return !relative.startsWith("..") && !path$3.isAbsolute(relative);
  });
  if (!isValid) throw new Error("非法路径访问");
  return userPath;
}
async function read_image_to_base64(filePath) {
  try {
    const validPath = validatePath(filePath);
    const buffer = await fs$2.readFile(validPath);
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
    const config = new Config$2("config.json");
    const configStoragePath = config.getConfigItem("archievePath");
    let archievePath = "";
    if (configStoragePath === "" || configStoragePath === void 0) {
      archievePath = path$3.join(app.isPackaged ? path$3.dirname(process.execPath) : app.getAppPath(), "archieve");
      console.warn("Using default archieve path, when the software updates, the archieve might lost.");
    } else {
      archievePath = configStoragePath;
    }
    const iconPath = path$3.join(archievePath, "QuickClass", "Tools", "Icons", id + ".png");
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
function DataLoader() {
  const data = new Config$1("classinfo.json", {
    students: {},
    groups: {}
  });
  const classData = data.loadConfig();
  return classData;
}
function DataSaver(data, key) {
  const configSession = new Config$1("classinfo.json", {
    students: {},
    groups: {}
  });
  configSession.setConfigItem(key, data);
  console.log("Save data successfully");
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
        point: this.groups[uuid].point,
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
  saveGroupStorage(groups) {
    DataSaver(groups, "groups");
  }
};
function sortGroupsBypoint(groups) {
  const sortedGroups = Object.values(groups).sort((a, b) => b.point - a.point);
  const result = sortedGroups.reduce((acc, group) => {
    acc[group.name] = group.point;
    return acc;
  }, {});
  return result;
}
class QuickClass {
  constructor() {
    __publicField(this, "configSession");
    __publicField(this, "onClassTool");
    __publicField(this, "Noticeboard");
    __publicField(this, "extTools");
    __publicField(this, "grouprank");
    console.log("QuickClass Engine v25.3");
    this.configSession = new Config$2("config.json");
    this.configSession.getConfigItem("archievePath");
    this.Noticeboard = new Noticeboard();
    this.extTools = new EduTool();
    this.onClassTool = new OnClass$1();
    this.grouprank = sortGroupsBypoint;
  }
  getConfigItem(key) {
    const content = this.configSession.getConfigItem(key);
    if (!content) {
      console.log("Config item not found");
      return null;
    }
    return content;
  }
  getGroupRank() {
    const groupList = this.onClassTool.groupList;
    return sortGroupsBypoint(groupList);
  }
  reloadEngine() {
    console.log("Reloading QCE Classes");
    this.configSession = new Config$2("config.json");
    this.Noticeboard = new Noticeboard();
    this.onClassTool = new OnClass$1();
    console.log("Reloaded");
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var polyfills;
var hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var constants = require$$0;
  var origCwd = process.cwd;
  var cwd = null;
  var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    if (!cwd)
      cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {
  }
  if (typeof process.chdir === "function") {
    var chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
  }
  polyfills = patch;
  function patch(fs2) {
    if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs2);
    }
    if (!fs2.lutimes) {
      patchLutimes(fs2);
    }
    fs2.chown = chownFix(fs2.chown);
    fs2.fchown = chownFix(fs2.fchown);
    fs2.lchown = chownFix(fs2.lchown);
    fs2.chmod = chmodFix(fs2.chmod);
    fs2.fchmod = chmodFix(fs2.fchmod);
    fs2.lchmod = chmodFix(fs2.lchmod);
    fs2.chownSync = chownFixSync(fs2.chownSync);
    fs2.fchownSync = chownFixSync(fs2.fchownSync);
    fs2.lchownSync = chownFixSync(fs2.lchownSync);
    fs2.chmodSync = chmodFixSync(fs2.chmodSync);
    fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
    fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
    fs2.stat = statFix(fs2.stat);
    fs2.fstat = statFix(fs2.fstat);
    fs2.lstat = statFix(fs2.lstat);
    fs2.statSync = statFixSync(fs2.statSync);
    fs2.fstatSync = statFixSync(fs2.fstatSync);
    fs2.lstatSync = statFixSync(fs2.lstatSync);
    if (fs2.chmod && !fs2.lchmod) {
      fs2.lchmod = function(path2, mode, cb) {
        if (cb) process.nextTick(cb);
      };
      fs2.lchmodSync = function() {
      };
    }
    if (fs2.chown && !fs2.lchown) {
      fs2.lchown = function(path2, uid, gid, cb) {
        if (cb) process.nextTick(cb);
      };
      fs2.lchownSync = function() {
      };
    }
    if (platform === "win32") {
      fs2.rename = typeof fs2.rename !== "function" ? fs2.rename : function(fs$rename) {
        function rename(from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
              setTimeout(function() {
                fs2.stat(to, function(stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb) cb(er);
          });
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
        return rename;
      }(fs2.rename);
    }
    fs2.read = typeof fs2.read !== "function" ? fs2.read : function(fs$read) {
      function read(fd, buffer, offset, length, position, callback_) {
        var callback;
        if (callback_ && typeof callback_ === "function") {
          var eagCounter = 0;
          callback = function(er, _, __) {
            if (er && er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
            }
            callback_.apply(this, arguments);
          };
        }
        return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
      return read;
    }(fs2.read);
    fs2.readSync = typeof fs2.readSync !== "function" ? fs2.readSync : /* @__PURE__ */ function(fs$readSync) {
      return function(fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs2, fd, buffer, offset, length, position);
          } catch (er) {
            if (er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs2.readSync);
    function patchLchmod(fs22) {
      fs22.lchmod = function(path2, mode, callback) {
        fs22.open(
          path2,
          constants.O_WRONLY | constants.O_SYMLINK,
          mode,
          function(err, fd) {
            if (err) {
              if (callback) callback(err);
              return;
            }
            fs22.fchmod(fd, mode, function(err2) {
              fs22.close(fd, function(err22) {
                if (callback) callback(err2 || err22);
              });
            });
          }
        );
      };
      fs22.lchmodSync = function(path2, mode) {
        var fd = fs22.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
        var threw = true;
        var ret;
        try {
          ret = fs22.fchmodSync(fd, mode);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs22.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs22.closeSync(fd);
          }
        }
        return ret;
      };
    }
    function patchLutimes(fs22) {
      if (constants.hasOwnProperty("O_SYMLINK") && fs22.futimes) {
        fs22.lutimes = function(path2, at, mt, cb) {
          fs22.open(path2, constants.O_SYMLINK, function(er, fd) {
            if (er) {
              if (cb) cb(er);
              return;
            }
            fs22.futimes(fd, at, mt, function(er2) {
              fs22.close(fd, function(er22) {
                if (cb) cb(er2 || er22);
              });
            });
          });
        };
        fs22.lutimesSync = function(path2, at, mt) {
          var fd = fs22.openSync(path2, constants.O_SYMLINK);
          var ret;
          var threw = true;
          try {
            ret = fs22.futimesSync(fd, at, mt);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs22.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs22.closeSync(fd);
            }
          }
          return ret;
        };
      } else if (fs22.futimes) {
        fs22.lutimes = function(_a, _b, _c, cb) {
          if (cb) process.nextTick(cb);
        };
        fs22.lutimesSync = function() {
        };
      }
    }
    function chmodFix(orig) {
      if (!orig) return orig;
      return function(target, mode, cb) {
        return orig.call(fs2, target, mode, function(er) {
          if (chownErOk(er)) er = null;
          if (cb) cb.apply(this, arguments);
        });
      };
    }
    function chmodFixSync(orig) {
      if (!orig) return orig;
      return function(target, mode) {
        try {
          return orig.call(fs2, target, mode);
        } catch (er) {
          if (!chownErOk(er)) throw er;
        }
      };
    }
    function chownFix(orig) {
      if (!orig) return orig;
      return function(target, uid, gid, cb) {
        return orig.call(fs2, target, uid, gid, function(er) {
          if (chownErOk(er)) er = null;
          if (cb) cb.apply(this, arguments);
        });
      };
    }
    function chownFixSync(orig) {
      if (!orig) return orig;
      return function(target, uid, gid) {
        try {
          return orig.call(fs2, target, uid, gid);
        } catch (er) {
          if (!chownErOk(er)) throw er;
        }
      };
    }
    function statFix(orig) {
      if (!orig) return orig;
      return function(target, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = null;
        }
        function callback(er, stats) {
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          if (cb) cb.apply(this, arguments);
        }
        return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
      };
    }
    function statFixSync(orig) {
      if (!orig) return orig;
      return function(target, options) {
        var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
        if (stats) {
          if (stats.uid < 0) stats.uid += 4294967296;
          if (stats.gid < 0) stats.gid += 4294967296;
        }
        return stats;
      };
    }
    function chownErOk(er) {
      if (!er)
        return true;
      if (er.code === "ENOSYS")
        return true;
      var nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM")
          return true;
      }
      return false;
    }
  }
  return polyfills;
}
var legacyStreams;
var hasRequiredLegacyStreams;
function requireLegacyStreams() {
  if (hasRequiredLegacyStreams) return legacyStreams;
  hasRequiredLegacyStreams = 1;
  var Stream = require$$0$1.Stream;
  legacyStreams = legacy;
  function legacy(fs2) {
    return {
      ReadStream,
      WriteStream
    };
    function ReadStream(path2, options) {
      if (!(this instanceof ReadStream)) return new ReadStream(path2, options);
      Stream.call(this);
      var self2 = this;
      this.path = path2;
      this.fd = null;
      this.readable = true;
      this.paused = false;
      this.flags = "r";
      this.mode = 438;
      this.bufferSize = 64 * 1024;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.encoding) this.setEncoding(this.encoding);
      if (this.start !== void 0) {
        if ("number" !== typeof this.start) {
          throw TypeError("start must be a Number");
        }
        if (this.end === void 0) {
          this.end = Infinity;
        } else if ("number" !== typeof this.end) {
          throw TypeError("end must be a Number");
        }
        if (this.start > this.end) {
          throw new Error("start must be <= end");
        }
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          self2._read();
        });
        return;
      }
      fs2.open(this.path, this.flags, this.mode, function(err, fd) {
        if (err) {
          self2.emit("error", err);
          self2.readable = false;
          return;
        }
        self2.fd = fd;
        self2.emit("open", fd);
        self2._read();
      });
    }
    function WriteStream(path2, options) {
      if (!(this instanceof WriteStream)) return new WriteStream(path2, options);
      Stream.call(this);
      this.path = path2;
      this.fd = null;
      this.writable = true;
      this.flags = "w";
      this.encoding = "binary";
      this.mode = 438;
      this.bytesWritten = 0;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.start !== void 0) {
        if ("number" !== typeof this.start) {
          throw TypeError("start must be a Number");
        }
        if (this.start < 0) {
          throw new Error("start must be >= zero");
        }
        this.pos = this.start;
      }
      this.busy = false;
      this._queue = [];
      if (this.fd === null) {
        this._open = fs2.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
        this.flush();
      }
    }
  }
  return legacyStreams;
}
var clone_1;
var hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone_1;
  hasRequiredClone = 1;
  clone_1 = clone;
  var getPrototypeOf = Object.getPrototypeOf || function(obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (obj instanceof Object)
      var copy = { __proto__: getPrototypeOf(obj) };
    else
      var copy = /* @__PURE__ */ Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function(key) {
      Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy;
  }
  return clone_1;
}
var gracefulFs;
var hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var fs2 = fs__default;
  var polyfills2 = requirePolyfills();
  var legacy = requireLegacyStreams();
  var clone = requireClone();
  var util = require$$4;
  var gracefulQueue;
  var previousSymbol;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") {
    gracefulQueue = Symbol.for("graceful-fs.queue");
    previousSymbol = Symbol.for("graceful-fs.previous");
  } else {
    gracefulQueue = "___graceful-fs.queue";
    previousSymbol = "___graceful-fs.previous";
  }
  function noop() {
  }
  function publishQueue(context, queue2) {
    Object.defineProperty(context, gracefulQueue, {
      get: function() {
        return queue2;
      }
    });
  }
  var debug = noop;
  if (util.debuglog)
    debug = util.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
    debug = function() {
      var m = util.format.apply(util, arguments);
      m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
      console.error(m);
    };
  if (!fs2[gracefulQueue]) {
    var queue = commonjsGlobal[gracefulQueue] || [];
    publishQueue(fs2, queue);
    fs2.close = function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs2, fd, function(err) {
          if (!err) {
            resetQueue();
          }
          if (typeof cb === "function")
            cb.apply(this, arguments);
        });
      }
      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs2.close);
    fs2.closeSync = function(fs$closeSync) {
      function closeSync(fd) {
        fs$closeSync.apply(fs2, arguments);
        resetQueue();
      }
      Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync;
    }(fs2.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
      process.on("exit", function() {
        debug(fs2[gracefulQueue]);
        require$$5.equal(fs2[gracefulQueue].length, 0);
      });
    }
  }
  if (!commonjsGlobal[gracefulQueue]) {
    publishQueue(commonjsGlobal, fs2[gracefulQueue]);
  }
  gracefulFs = patch(clone(fs2));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs2.__patched) {
    gracefulFs = patch(fs2);
    fs2.__patched = true;
  }
  function patch(fs22) {
    polyfills2(fs22);
    fs22.gracefulify = patch;
    fs22.createReadStream = createReadStream;
    fs22.createWriteStream = createWriteStream;
    var fs$readFile = fs22.readFile;
    fs22.readFile = readFile2;
    function readFile2(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$readFile(path2, options, cb);
      function go$readFile(path22, options2, cb2, startTime) {
        return fs$readFile(path22, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readFile, [path22, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$writeFile = fs22.writeFile;
    fs22.writeFile = writeFile2;
    function writeFile2(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$writeFile(path2, data, options, cb);
      function go$writeFile(path22, data2, options2, cb2, startTime) {
        return fs$writeFile(path22, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$writeFile, [path22, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$appendFile = fs22.appendFile;
    if (fs$appendFile)
      fs22.appendFile = appendFile;
    function appendFile(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$appendFile(path2, data, options, cb);
      function go$appendFile(path22, data2, options2, cb2, startTime) {
        return fs$appendFile(path22, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$appendFile, [path22, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$copyFile = fs22.copyFile;
    if (fs$copyFile)
      fs22.copyFile = copyFile;
    function copyFile(src, dest, flags, cb) {
      if (typeof flags === "function") {
        cb = flags;
        flags = 0;
      }
      return go$copyFile(src, dest, flags, cb);
      function go$copyFile(src2, dest2, flags2, cb2, startTime) {
        return fs$copyFile(src2, dest2, flags2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$readdir = fs22.readdir;
    fs22.readdir = readdir;
    var noReaddirOptionVersions = /^v[0-5]\./;
    function readdir(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path22, options2, cb2, startTime) {
        return fs$readdir(path22, fs$readdirCallback(
          path22,
          options2,
          cb2,
          startTime
        ));
      } : function go$readdir2(path22, options2, cb2, startTime) {
        return fs$readdir(path22, options2, fs$readdirCallback(
          path22,
          options2,
          cb2,
          startTime
        ));
      };
      return go$readdir(path2, options, cb);
      function fs$readdirCallback(path22, options2, cb2, startTime) {
        return function(err, files) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([
              go$readdir,
              [path22, options2, cb2],
              err,
              startTime || Date.now(),
              Date.now()
            ]);
          else {
            if (files && files.sort)
              files.sort();
            if (typeof cb2 === "function")
              cb2.call(this, err, files);
          }
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var legStreams = legacy(fs22);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs22.ReadStream;
    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs22.WriteStream;
    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs22, "ReadStream", {
      get: function() {
        return ReadStream;
      },
      set: function(val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs22, "WriteStream", {
      get: function() {
        return WriteStream;
      },
      set: function(val) {
        WriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileReadStream = ReadStream;
    Object.defineProperty(fs22, "FileReadStream", {
      get: function() {
        return FileReadStream;
      },
      set: function(val) {
        FileReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs22, "FileWriteStream", {
      get: function() {
        return FileWriteStream;
      },
      set: function(val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    function ReadStream(path2, options) {
      if (this instanceof ReadStream)
        return fs$ReadStream.apply(this, arguments), this;
      else
        return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          if (that.autoClose)
            that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
          that.read();
        }
      });
    }
    function WriteStream(path2, options) {
      if (this instanceof WriteStream)
        return fs$WriteStream.apply(this, arguments), this;
      else
        return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }
    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
        }
      });
    }
    function createReadStream(path2, options) {
      return new fs22.ReadStream(path2, options);
    }
    function createWriteStream(path2, options) {
      return new fs22.WriteStream(path2, options);
    }
    var fs$open = fs22.open;
    fs22.open = open;
    function open(path2, flags, mode, cb) {
      if (typeof mode === "function")
        cb = mode, mode = null;
      return go$open(path2, flags, mode, cb);
      function go$open(path22, flags2, mode2, cb2, startTime) {
        return fs$open(path22, flags2, mode2, function(err, fd) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$open, [path22, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    return fs22;
  }
  function enqueue(elem) {
    debug("ENQUEUE", elem[0].name, elem[1]);
    fs2[gracefulQueue].push(elem);
    retry();
  }
  var retryTimer;
  function resetQueue() {
    var now = Date.now();
    for (var i = 0; i < fs2[gracefulQueue].length; ++i) {
      if (fs2[gracefulQueue][i].length > 2) {
        fs2[gracefulQueue][i][3] = now;
        fs2[gracefulQueue][i][4] = now;
      }
    }
    retry();
  }
  function retry() {
    clearTimeout(retryTimer);
    retryTimer = void 0;
    if (fs2[gracefulQueue].length === 0)
      return;
    var elem = fs2[gracefulQueue].shift();
    var fn = elem[0];
    var args = elem[1];
    var err = elem[2];
    var startTime = elem[3];
    var lastTime = elem[4];
    if (startTime === void 0) {
      debug("RETRY", fn.name, args);
      fn.apply(null, args);
    } else if (Date.now() - startTime >= 6e4) {
      debug("TIMEOUT", fn.name, args);
      var cb = args.pop();
      if (typeof cb === "function")
        cb.call(null, err);
    } else {
      var sinceAttempt = Date.now() - lastTime;
      var sinceStart = Math.max(lastTime - startTime, 1);
      var desiredDelay = Math.min(sinceStart * 1.2, 100);
      if (sinceAttempt >= desiredDelay) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args.concat([startTime]));
      } else {
        fs2[gracefulQueue].push(elem);
      }
    }
    if (retryTimer === void 0) {
      retryTimer = setTimeout(retry, 0);
    }
  }
  return gracefulFs;
}
var _fs;
try {
  _fs = requireGracefulFs();
} catch (_) {
  _fs = fs__default;
}
function readFile(file, options, callback) {
  if (callback == null) {
    callback = options;
    options = {};
  }
  if (typeof options === "string") {
    options = { encoding: options };
  }
  options = options || {};
  var fs2 = options.fs || _fs;
  var shouldThrow = true;
  if ("throws" in options) {
    shouldThrow = options.throws;
  }
  fs2.readFile(file, options, function(err, data) {
    if (err) return callback(err);
    data = stripBom(data);
    var obj;
    try {
      obj = JSON.parse(data, options ? options.reviver : null);
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ": " + err2.message;
        return callback(err2);
      } else {
        return callback(null, null);
      }
    }
    callback(null, obj);
  });
}
function readFileSync(file, options) {
  options = options || {};
  if (typeof options === "string") {
    options = { encoding: options };
  }
  var fs2 = options.fs || _fs;
  var shouldThrow = true;
  if ("throws" in options) {
    shouldThrow = options.throws;
  }
  try {
    var content = fs2.readFileSync(file, options);
    content = stripBom(content);
    return JSON.parse(content, options.reviver);
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ": " + err.message;
      throw err;
    } else {
      return null;
    }
  }
}
function stringify(obj, options) {
  var spaces;
  var EOL = "\n";
  if (typeof options === "object" && options !== null) {
    if (options.spaces) {
      spaces = options.spaces;
    }
    if (options.EOL) {
      EOL = options.EOL;
    }
  }
  var str = JSON.stringify(obj, options ? options.replacer : null, spaces);
  return str.replace(/\n/g, EOL) + EOL;
}
function writeFile(file, obj, options, callback) {
  if (callback == null) {
    callback = options;
    options = {};
  }
  options = options || {};
  var fs2 = options.fs || _fs;
  var str = "";
  try {
    str = stringify(obj, options);
  } catch (err) {
    if (callback) callback(err, null);
    return;
  }
  fs2.writeFile(file, str, options, callback);
}
function writeFileSync(file, obj, options) {
  options = options || {};
  var fs2 = options.fs || _fs;
  var str = stringify(obj, options);
  return fs2.writeFileSync(file, str, options);
}
function stripBom(content) {
  if (Buffer.isBuffer(content)) content = content.toString("utf8");
  content = content.replace(/^\uFEFF/, "");
  return content;
}
var jsonfile$1 = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
};
var jsonfile_1 = jsonfile$1;
var path$1 = path__default;
var fs = fs__default;
var _0777 = parseInt("0777", 8);
var mkdirp$1 = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
function mkdirP(p, opts, f, made) {
  if (typeof opts === "function") {
    f = opts;
    opts = {};
  } else if (!opts || typeof opts !== "object") {
    opts = { mode: opts };
  }
  var mode = opts.mode;
  var xfs = opts.fs || fs;
  if (mode === void 0) {
    mode = _0777;
  }
  if (!made) made = null;
  var cb = f || /* istanbul ignore next */
  function() {
  };
  p = path$1.resolve(p);
  xfs.mkdir(p, mode, function(er) {
    if (!er) {
      made = made || p;
      return cb(null, made);
    }
    switch (er.code) {
      case "ENOENT":
        if (path$1.dirname(p) === p) return cb(er);
        mkdirP(path$1.dirname(p), opts, function(er2, made2) {
          if (er2) cb(er2, made2);
          else mkdirP(p, opts, cb, made2);
        });
        break;
      default:
        xfs.stat(p, function(er2, stat) {
          if (er2 || !stat.isDirectory()) cb(er, made);
          else cb(null, made);
        });
        break;
    }
  });
}
mkdirP.sync = function sync(p, opts, made) {
  if (!opts || typeof opts !== "object") {
    opts = { mode: opts };
  }
  var mode = opts.mode;
  var xfs = opts.fs || fs;
  if (mode === void 0) {
    mode = _0777;
  }
  if (!made) made = null;
  p = path$1.resolve(p);
  try {
    xfs.mkdirSync(p, mode);
    made = made || p;
  } catch (err0) {
    switch (err0.code) {
      case "ENOENT":
        made = sync(path$1.dirname(p), opts, made);
        sync(p, opts, made);
        break;
      default:
        var stat;
        try {
          stat = xfs.statSync(p);
        } catch (err1) {
          throw err0;
        }
        if (!stat.isDirectory()) throw err0;
        break;
    }
  }
  return made;
};
const path = path__default;
const electron = require$$1;
const jsonfile = jsonfile_1;
const mkdirp = mkdirp$1;
var electronWindowState = function(options) {
  const app2 = electron.app || electron.remote.app;
  const screen = electron.screen || electron.remote.screen;
  let state;
  let winRef;
  let stateChangeTimer;
  const eventHandlingDelay = 100;
  const config = Object.assign({
    file: "window-state.json",
    path: app2.getPath("userData"),
    maximize: true,
    fullScreen: true
  }, options);
  const fullStoreFileName = path.join(config.path, config.file);
  function isNormal(win2) {
    return !win2.isMaximized() && !win2.isMinimized() && !win2.isFullScreen();
  }
  function hasBounds() {
    return state && Number.isInteger(state.x) && Number.isInteger(state.y) && Number.isInteger(state.width) && state.width > 0 && Number.isInteger(state.height) && state.height > 0;
  }
  function resetStateToDefault() {
    const displayBounds = screen.getPrimaryDisplay().bounds;
    state = {
      width: config.defaultWidth || 800,
      height: config.defaultHeight || 600,
      x: 0,
      y: 0,
      displayBounds
    };
  }
  function windowWithinBounds(bounds) {
    return state.x >= bounds.x && state.y >= bounds.y && state.x + state.width <= bounds.x + bounds.width && state.y + state.height <= bounds.y + bounds.height;
  }
  function ensureWindowVisibleOnSomeDisplay() {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(display.bounds);
    });
    if (!visible) {
      return resetStateToDefault();
    }
  }
  function validateState() {
    const isValid = state && (hasBounds() || state.isMaximized || state.isFullScreen);
    if (!isValid) {
      state = null;
      return;
    }
    if (hasBounds() && state.displayBounds) {
      ensureWindowVisibleOnSomeDisplay();
    }
  }
  function updateState(win2) {
    win2 = win2 || winRef;
    if (!win2) {
      return;
    }
    try {
      const winBounds = win2.getBounds();
      if (isNormal(win2)) {
        state.x = winBounds.x;
        state.y = winBounds.y;
        state.width = winBounds.width;
        state.height = winBounds.height;
      }
      state.isMaximized = win2.isMaximized();
      state.isFullScreen = win2.isFullScreen();
      state.displayBounds = screen.getDisplayMatching(winBounds).bounds;
    } catch (err) {
    }
  }
  function saveState(win2) {
    if (win2) {
      updateState(win2);
    }
    try {
      mkdirp.sync(path.dirname(fullStoreFileName));
      jsonfile.writeFileSync(fullStoreFileName, state);
    } catch (err) {
    }
  }
  function stateChangeHandler() {
    clearTimeout(stateChangeTimer);
    stateChangeTimer = setTimeout(updateState, eventHandlingDelay);
  }
  function closeHandler() {
    updateState();
  }
  function closedHandler() {
    unmanage();
    saveState();
  }
  function manage(win2) {
    if (config.maximize && state.isMaximized) {
      win2.maximize();
    }
    if (config.fullScreen && state.isFullScreen) {
      win2.setFullScreen(true);
    }
    win2.on("resize", stateChangeHandler);
    win2.on("move", stateChangeHandler);
    win2.on("close", closeHandler);
    win2.on("closed", closedHandler);
    winRef = win2;
  }
  function unmanage() {
    if (winRef) {
      winRef.removeListener("resize", stateChangeHandler);
      winRef.removeListener("move", stateChangeHandler);
      clearTimeout(stateChangeTimer);
      winRef.removeListener("close", closeHandler);
      winRef.removeListener("closed", closedHandler);
      winRef = null;
    }
  }
  try {
    state = jsonfile.readFileSync(fullStoreFileName);
  } catch (err) {
  }
  validateState();
  state = Object.assign({
    width: config.defaultWidth || 800,
    height: config.defaultHeight || 600
  }, state);
  return {
    get x() {
      return state.x;
    },
    get y() {
      return state.y;
    },
    get width() {
      return state.width;
    },
    get height() {
      return state.height;
    },
    get displayBounds() {
      return state.displayBounds;
    },
    get isMaximized() {
      return state.isMaximized;
    },
    get isFullScreen() {
      return state.isFullScreen;
    },
    saveState,
    unmanage,
    manage,
    resetStateToDefault
  };
};
const windowStateKeeper = /* @__PURE__ */ getDefaultExportFromCjs(electronWindowState);
const __dirname$1 = path$3.dirname(fileURLToPath(import.meta.url));
class floatMenu {
  constructor(mainWindow, VITE_DEV_SERVER_URL2, RENDERER_DIST2) {
    __publicField(this, "floatMenu");
    __publicField(this, "winStateKeeper");
    __publicField(this, "hide", () => {
      var _a;
      return (_a = this.floatMenu) == null ? void 0 : _a.hide();
    });
    __publicField(this, "show", () => {
      var _a;
      return (_a = this.floatMenu) == null ? void 0 : _a.show();
    });
    __publicField(this, "saveState", () => {
      if (this.floatMenu) {
        this.winStateKeeper.saveState(this.floatMenu);
      }
    });
    __publicField(this, "isVisible", () => {
      var _a;
      return (_a = this.floatMenu) == null ? void 0 : _a.isVisible;
    });
    this.winStateKeeper = windowStateKeeper({
      defaultHeight: 250,
      defaultWidth: 60,
      file: "floatmenu-window-state.json"
    });
    this.floatMenu = new BrowserWindow({
      width: 60,
      height: 250,
      x: this.winStateKeeper.x,
      y: this.winStateKeeper.y,
      alwaysOnTop: true,
      skipTaskbar: true,
      frame: false,
      transparent: true,
      resizable: false,
      webPreferences: {
        preload: path$3.join(__dirname$1, "preload.mjs")
      }
    });
    this.winStateKeeper.manage(this.floatMenu);
    console.log(this.floatMenu.getPosition());
    this.floatMenu.on("move", () => {
      var _a;
      console.log((_a = this.floatMenu) == null ? void 0 : _a.getPosition());
    });
    this.floatMenu.setAlwaysOnTop(true, "screen-saver");
    this.floatMenu.on("close", () => {
      if (this.floatMenu) {
        this.winStateKeeper.saveState(this.floatMenu);
      }
    });
    if (VITE_DEV_SERVER_URL2) {
      this.floatMenu.loadURL(VITE_DEV_SERVER_URL2 + "/floatmenu");
    } else {
      this.floatMenu.loadFile(path$3.join(RENDERER_DIST2, "floatmenu.html"));
    }
    ipcMain.handle("floatMenu.showMainWindow", () => {
      mainWindow == null ? void 0 : mainWindow.show();
    });
  }
}
let quickClass = new QuickClass();
let extTool = quickClass.extTools;
let noticeBoard = quickClass.Noticeboard;
let OnClass2 = quickClass.onClassTool;
const __dirname = path$3.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$3.join(__dirname, "..");
console.log("Path:", app.getAppPath);
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$3.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$3.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$3.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  let winStateKeeper = windowStateKeeper({
    defaultHeight: 1024,
    defaultWidth: 1440
  });
  win = new BrowserWindow({
    icon: path$3.join(process.env.VITE_PUBLIC, "favicon-64.ico"),
    width: winStateKeeper.width,
    height: winStateKeeper.height,
    x: winStateKeeper.x,
    y: winStateKeeper.y,
    frame: false,
    // resizable: false,
    webPreferences: {
      preload: path$3.join(__dirname, "preload.mjs"),
      nodeIntegration: false
    },
    transparent: true,
    alwaysOnTop: true
  });
  win.setAlwaysOnTop(true, "screen-saver");
  winStateKeeper.manage(win);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$3.join(RENDERER_DIST, "index.html"));
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
      preload: path$3.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(VITE_DEV_SERVER_URL + "/settings");
  } else {
    settingsWindow.loadFile(path$3.join(RENDERER_DIST, "settings.html"));
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
      preload: path$3.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    noticemanWindow.loadURL(VITE_DEV_SERVER_URL + "/noticeman");
  } else {
    noticemanWindow.loadFile(path$3.join(RENDERER_DIST, "noticeman.html"));
  }
}
ipcMain.handle("noticeboard.Window.open", async () => {
  if (noticemanWindow) {
    noticemanWindow.focus();
  } else {
    createNoticeWindow();
  }
});
ipcMain.handle("noticeboard.Window.close", () => {
  if (noticemanWindow) {
    noticemanWindow.close();
    noticemanWindow = null;
  }
});
ipcMain.handle("quickclass.engine.onclass.getData.groups", async () => {
  try {
    const groupsInfo = OnClass2.getGroupList();
    console.log("获取分组信息成功:", groupsInfo);
    return groupsInfo;
  } catch (error) {
    console.error("获取班级信息失败:", error);
    return null;
  }
});
ipcMain.handle("quickclass.engine.onclass.getData.students", async () => {
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
ipcMain.handle("quickclass.engine.onclass.tools.random.student", async (_, n) => {
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
ipcMain.handle("quickclass.engine.onclass.tools.random.group", async (_, n) => {
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
ipcMain.handle("quickclass.engine.onclass.tools.random.groupMember", async (_, n) => {
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
ipcMain.handle("quickclass.engine.hub.groupRank.get", () => {
  return quickClass.getGroupRank();
});
ipcMain.handle("quickclass.engine.onclass.updateData.groups", async (_, groups) => {
  console.log("[main.ts]Saving updated group data.");
  groups = JSON.parse(groups);
  OnClass2.saveGroupStorage(groups);
});
ipcMain.handle("quickclass.engine.hub.dock.extTool.launch", async (_, toolId) => {
  try {
    extTool.startTool(toolId);
  } catch (error) {
    console.error("启动工具失败:", error);
    dialog.showErrorBox("启动外部工具失败", "请检查工具配置或路径是否正确。");
  }
});
ipcMain.handle("quickclass.engine.hub.dock.extTool.getList", async () => {
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
ipcMain.handle("hot-reload-engine", async () => {
  quickClass.reloadEngine();
  extTool = quickClass.extTools;
  noticeBoard = quickClass.Noticeboard;
  OnClass2 = quickClass.onClassTool;
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("before-quit", () => {
  floatMenu_ == null ? void 0 : floatMenu_.saveState();
});
function createTray() {
  const trayIconPath = path$3.join(process.env.VITE_PUBLIC, "favicon-64.ico");
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
      (floatMenu_ == null ? void 0 : floatMenu_.isVisible()) ? floatMenu_.hide() : floatMenu_ == null ? void 0 : floatMenu_.show();
    }
  });
}
ipcMain.handle("main.MainWindow.show", () => {
  (win == null ? void 0 : win.isVisible()) ? win == null ? void 0 : win.hide() : win == null ? void 0 : win.show();
  floatMenu_ == null ? void 0 : floatMenu_.hide();
});
let floatMenu_;
app.whenReady().then(() => {
  try {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit();
      return;
    }
    createTray();
    createWindow();
    floatMenu_ = new floatMenu(win, VITE_DEV_SERVER_URL, RENDERER_DIST);
    console.log("Init floatMenu");
    console.log(quickClass.configSession.getConfigItem("archievePath"));
    app.on("second-instance", (event, commandLine, workingDirectory) => {
      if (win) {
        if (win.isMinimized()) win.restore();
        win.isVisible() ? win.hide() : win.show();
        win.focus();
      }
    });
    floatMenu_.hide();
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
    floatMenu_ == null ? void 0 : floatMenu_.show();
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
