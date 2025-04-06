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

export function DataSaver(data: any, key: string) {
    const configSession = new Config('classinfo.json', {
        students: {},
        groups: {}
    });
    configSession.setConfigItem(key, data);
    console.log("Save data successfully")
}