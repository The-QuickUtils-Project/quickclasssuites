import * as fs from 'fs';
import * as path from 'path';

const appName = 'classhub';

export class Config {
    private configPath: string;

    constructor(fileName: string) {
        // 仅支持 Windows 平台，使用 APPDATA 目录
        const appDataPath = process.env.APPDATA || '';
        this.configPath = path.join(appDataPath, appName, 'storage', fileName);

        // 确保配置目录存在
        const configDir = path.dirname(this.configPath);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }

        // 如果配置文件不存在，创建一个空文件
        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, JSON.stringify({}));
        }
    }

    // 读取配置
    loadConfig(): Record<string, any> {
        try {
            const data = fs.readFileSync(this.configPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('读取配置失败:', error);
            return {};
        }
    }

    // 获取配置项
    getConfigItem(key: string): any {
        const config = this.loadConfig();
        return config[key];
    }

    // 设置配置项
    setConfigItem(key: string, value: any): void {
        const config = this.loadConfig();
        config[key] = value;
        this.saveConfig(config);
    }

    // 删除配置项
    deleteConfigItem(key: string): void {
        const config = this.loadConfig();
        delete config[key];
        this.saveConfig(config);
    }

    // 保存配置
    private saveConfig(config: Record<string, any>): void {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
        } catch (error) {
            console.error('保存配置失败:', error);
        }
    }
}