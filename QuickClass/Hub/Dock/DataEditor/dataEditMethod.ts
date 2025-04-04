import { Config } from "./configLoader";

export function DataLoader() {
    const config = new Config('extTools.json');
    const toolsData = config.loadConfig();
    return toolsData;
}

export interface ToolInfo {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface ToolsData {
    [id: string]: {
        name: string;
        icon: string;
        description: string;
        path: string;
    }
}

export function addData(toolInfo: ToolInfo, originalData: ToolsData, path: string): ToolsData {
    const { id, name, icon, description } = toolInfo;
    let processedData = originalData;
    processedData[id] = {
        name: name,
        icon: icon,
        description: description,
        path: path
    }
    return processedData;
}