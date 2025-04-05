interface students {
    [uuid: string]: {
        name: string,
        group: string,
        avatar: string,
    }
}

interface groups {
    [uuid: string]: {
        name: string,
        point: number,
        students: string[]
    }
}

interface studentData {
    students: students,
    groups: groups
}

interface notices {
    [uuid: string]: {
        title: string,
        content: string,
        date: string,
        isPinned: boolean
    }
}