import { v4 as uuidv4 } from "uuid";
import testData from './test.json';

let GlobalData: studentData;

function DataLoader(Data: studentData) {
    GlobalData = Data;
}

function addStudent(
    name: string,
    groupUUID: string
){
    const student = {
        name: name,
        id: uuidv4(),
        group: groupUUID,
    };
    GlobalData.students[student.id] = student;
    if (GlobalData.groups[groupUUID]) {
        GlobalData.groups[groupUUID].students.push(student.id);
    }
    return GlobalData;
}

DataLoader(testData);
addStudent("2minRain", "g1");