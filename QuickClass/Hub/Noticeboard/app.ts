import { Config } from "../../Config/configLoader";

export default class Noticeboard{
    notices: notices;
    constructor(){
        console.log('Noticeboard initialized');
        const config = new Config('noticeboard.json');
        const notices = config.loadConfig();
        console.log('Loaded notices')
        this.notices = notices.notices || {};
    };
    
}