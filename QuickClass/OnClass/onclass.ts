import { DataLoader } from "./DataEditor/dataEditMethod";

export class OnClass{
    studentData: studentData;
    public studentList: students;
    public groupList: groups;
    constructor(){
        // 加载学生/小组信息
        this.studentData = DataLoader()
        this.studentList = this.studentData.students;
        this.groupList = this.studentData.groups;
        console.log('groups', this.groupList);
    };
    getStudentList(groupId: string | null) {
        // 返回学生列表
        if (groupId) {
            return this.groupList[groupId].students;
        }
        return Object.keys(this.studentList);
    };
    getGroupList() {
        // 返回小组列表
        return this.groupList;
    };
    getStudentInfo(studentId: string) {
        // 返回学生信息
        const student = this.studentList[studentId];
        if (!student) {
            console.log('Student not found');
            return null;
        }
        return student;
    };
    getGroupInfo(groupId: string) {
        // 返回小组信息
        const group = this.groupList[groupId];
        if (!group) {
            console.log('Group not found');
            return null;
        }
        return group;
    };
    getStudentGroup(studentId: string) {
        // 返回学生所在小组
        const student = this.studentList[studentId];
        if (!student) {
            console.log('Student not found');
            return null;
        }
        return student.group;
    };
}