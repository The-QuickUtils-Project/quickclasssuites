import { Config } from './Config/configLoader';

export class QuickClass{
    public configSession: Config;
    constructor(){
        this.configSession = new Config('config.json');
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