import { Config } from './Config/configLoader';
import Noticeboard from './Hub/Noticeboard/app';
import { EduTool } from './Hub/Dock/ExtEduToolManager';
import { OnClass } from './OnClass/OnClass';
import { sortGroupsBypoint } from './Hub/Grouprank/Grouprank';

export class QuickClass{
    public configSession: Config;
    public onClassTool: OnClass;
    public Noticeboard: Noticeboard;
    public extTools: any;
    public grouprank: Function;
    constructor(){
        console.log("QuickClass Engine v25.3")
        this.configSession = new Config('config.json');
        this.configSession.getConfigItem("archievePath");
        this.Noticeboard = new Noticeboard();
        this.extTools = new EduTool();
        this.onClassTool = new OnClass();
        this.grouprank = sortGroupsBypoint
    };
    getConfigItem(key: string): any{
        const content = this.configSession.getConfigItem(key)
        if (!content) {
            console.log('Config item not found')
            return null;
        }
        return content;
    };
    getGroupRank(){
        const groupList = this.onClassTool.groupList;
        return sortGroupsBypoint(groupList);
    };
    reloadEngine() {
        console.log('Reloading QCE Classes')
        this.configSession = new Config('config.json');
        this.Noticeboard = new Noticeboard();
        // 取消重新加载extTools
        // this.extTools = new EduTool();
        this.onClassTool = new OnClass();
        console.log('Reloaded')
    };
}