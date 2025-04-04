import { DataLoader, ToolsData } from "./DataEditor/dataEditMethod";
import { execFile } from 'child_process';


export class EduTool {
    tools: ToolsData = {};
    constructor() {
        const toolsData = DataLoader();
        this.tools = toolsData;
    };
    startTool(id: string) {
        console.log('Launching tool with ID:', id);
        const tool = this.tools[id];
        if (!tool) {
            console.error('Tool not found:', id);
            return;
        };
        console.log('Tool info:\nTool ID:' + id + '\nTool Name:' + tool.name + '\nTool Path:' + tool.path + '\nTool Icon:' + tool.icon + '\nTool Description:' + tool.description);
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
    }
}