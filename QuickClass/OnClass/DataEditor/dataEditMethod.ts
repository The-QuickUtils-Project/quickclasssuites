import { Config } from "./configLoader";

export function DataLoader(): studentData {
    const data = new Config('classinfo.json', {
        students: {},
        groups: {}
    });
    const classData = data.loadConfig();
    // @ts-ignore
    return classData;
}

