interface students {
    [uuid: string]: {
        name: string,
        id: string,
        group: string,
    }
}

interface groups {
    [uuid: string]: {
        name: string,
        credit: number,
        students: string[]
    }
}

interface studentData {
    students: students,
    groups: groups
}