"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var test_json_1 = require("./test.json");
var GlobalData;
function DataLoader(Data) {
    GlobalData = Data;
}
function addStudent(name, groupUUID) {
    var student = {
        name: name,
        id: (0, uuid_1.v4)(),
        group: groupUUID,
    };
    GlobalData.students[student.id] = student;
    if (GlobalData.groups[groupUUID]) {
        GlobalData.groups[groupUUID].students.push(student.id);
    }
}
DataLoader(test_json_1.default);
addStudent("2minRain", "g1");
