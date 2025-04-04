import * as fs from 'fs';
import * as path from 'path';

const appName = 'classhub';

export class Config {
    private configPath: string;

    constructor(fileName: string, initContent:Object={}) {
        const appDataPath = process.env.APPDATA || '';
        this.configPath = path.join(appDataPath, appName, 'QuickClassResources', 'Archieve' ,fileName);

        const configDir = path.dirname(this.configPath);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }

        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, JSON.stringify(initContent));
        }
    }

    loadConfig(): Record<string, any> {
        try {
            const data = fs.readFileSync(this.configPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('读取存档失败:', error);
            return {};
        }
    }

    getConfigItem(key: string): any {
        const config = this.loadConfig();
        return config[key];
    }

    setConfigItem(key: string, value: any): void {
        const config = this.loadConfig();
        config[key] = value;
        this.saveConfig(config);
    }

    deleteConfigItem(key: string): void {
        const config = this.loadConfig();
        delete config[key];
        this.saveConfig(config);
    }

    private saveConfig(config: Record<string, any>): void {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
        } catch (error) {
            console.error('保存配置失败:', error);
        }
    }
}