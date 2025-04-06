import * as fs from 'fs';
import * as path from 'path';
import { Config as engineConfig } from '../../Config/configLoader';
import { app } from "electron";

export class Config {
    private configPath: string;
    private config: engineConfig;
    constructor(fileName: string, initContent:Object={}) {
        this.config = new engineConfig('config.json')
        const configStoragePath = this.config.getConfigItem("archievePath");
        let archievePath = "";
        if (configStoragePath === "" || configStoragePath === undefined){
            archievePath = path.join(app.isPackaged ? path.dirname(process.execPath) : app.getAppPath(), 'archieve');
            console.warn('Using default archieve path, when the software updates, the archieve might lost.')
        }else{
            archievePath = configStoragePath;
        }
        this.configPath = path.join(archievePath, 'QuickClass', 'Archieve' ,fileName);

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