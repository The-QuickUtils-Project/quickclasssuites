import { Config } from './Config/configLoader';
import Noticeboard from './Hub/Noticeboard/app';
import { EduTool } from './Hub/Dock/ExtEduToolManager';

export class QuickClass{
    public configSession: Config;
    public onClassTool: any;
    public Noticeboard: Noticeboard;
    public extTools: any;
    constructor(){
        this.configSession = new Config('config.json');
        this.Noticeboard = new Noticeboard();
        this.extTools = new EduTool();
    };
    getConfigItem(key: string): any{
        const content = this.configSession.getConfigItem(key)
        if (!content) {
            console.log('Config item not found')
            return null;
        }
        return content;
    };
    
}