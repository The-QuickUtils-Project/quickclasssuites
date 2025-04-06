import { DataLoader, ToolsData } from "./DataEditor/dataEditMethod";
import { execFile } from 'child_process';
import { read_image_to_base64 } from "./imgconvert";
import path from 'node:path';
import { Config as engineConfig } from '../../Config/configLoader';
import { app } from "electron";

export class EduTool {
    tools: ToolsData = {};
    toolIconCache: { [key: string]: string } = {};
    constructor() {
        const toolsData = DataLoader();
        this.tools = toolsData;

        // 异步加载图标
        Object.keys(this.tools).forEach(async (id) => {
            const base64 = await this.getBase64Icon(id);
            if (base64) {
                this.toolIconCache[id] = base64;
            }
        });
    };
    startTool(id: string) {
        console.log('Launching tool with ID:', id);
        const tool = this.tools[id];
        if (!tool) {
            console.error('Tool not found:', id);
            return;
        };
        console.log('Tool info:\nTool ID:' + id + '\nTool Name:' + tool.name + '\nTool Path:' + tool.path + '\nTool Description:' + tool.description);
        execFile(tool.path, (error: any, stdout: any, stderr: any) => {
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
    };
    getToolList() {
        return this.tools;
    };
    getToolInfo(id: string) {
        const tool = this.tools[id];
        if (!tool) {
            console.error('Tool not found:', id);
            return null;
        }
        return tool;
    };
    async getBase64Icon(id: string): Promise<string | null> {
        const tool = this.tools[id];
        if (!tool) {
            console.error('Tool not found:', id);
            return null;
        }
        const config = new engineConfig('config.json')
        const configStoragePath = config.getConfigItem("archievePath");
        let archievePath = "";
        if (configStoragePath === "" || configStoragePath === undefined) {
            archievePath = path.join(app.isPackaged ? path.dirname(process.execPath) : app.getAppPath(), 'archieve');
            console.warn('Using default archieve path, when the software updates, the archieve might lost.')
        } else {
            archievePath = configStoragePath;
        }
        const iconPath = path.join(archievePath, 'QuickClass', 'Tools', 'Icons', id + '.png');

        try {
            const base64 = await read_image_to_base64(iconPath);
            if (base64) {
                console.log('[ExtToolHost] ReadImgSuccessful:', base64);
                this.toolIconCache[id] = base64; // 更新缓存
                return base64;
            } else {
                console.error('Failed to convert image to base64:', iconPath);
                return null;
            }
        } catch (error) {
            console.error('Error reading image:', error);
            return null;
        }
    };
    getIconData(id: string) {
        if (this.toolIconCache[id]) {
            return this.toolIconCache[id];
        } else {
            console.error('Icon not found in cache:', id);
            return null;
        }
    }
}