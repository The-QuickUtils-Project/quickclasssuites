import { UniqueDrawer } from "./common/random";

export default class Class{
    students: students;
    groups: groups;
    constructor(studentData: studentData){
        this.students = studentData.students;
        this.groups = studentData.groups;
    };
    getRandomStudent(n: number){
        const studentsUUID = Object.keys(this.students)
        const drawer = new UniqueDrawer(studentsUUID);
        const selectedStudents = drawer.drawWithoutReplacement(n);
        const selectedStudentsData = selectedStudents.map(uuid => {
            return {
                name: this.students[uuid].name,
                id: this.students[uuid].id,
                group: this.students[uuid].group
            }
        });
        return selectedStudentsData;
    };
    getRandomGroup(n: number){
        const groupsUUID = Object.keys(this.groups)
        const drawer = new UniqueDrawer(groupsUUID);
        const selectedGroups = drawer.drawWithoutReplacement(n);
        const selectedGroupsData = selectedGroups.map(uuid => {
            return {
                name: this.groups[uuid].name,
                credit: this.groups[uuid].credit,
                students: this.groups[uuid].students
            }
        });
        return selectedGroupsData;
    };
    getRandomStuInEachGp(n: number){
        const groupsUUID = Object.keys(this.groups);
        const groupStudentMap: { [key: string]: string[] } = {};
        groupsUUID.forEach(uuid => {
                const drawer = new UniqueDrawer(this.groups[uuid].students);
                const selectedStudents = drawer.drawWithoutReplacement(n);
                groupStudentMap[uuid] = selectedStudents.map(studentUUID => {
                    return this.students[studentUUID].name;
            });
        });
        return groupStudentMap;
    };
    plusCredit(groupUUID: string, credit: number){
        if(this.groups[groupUUID]){
            this.groups[groupUUID].credit += credit;
        }else{
            throw new Error('Group not found');
        }
    };
}