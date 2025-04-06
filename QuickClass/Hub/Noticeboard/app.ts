// QuickClass Hub Noticeboard Core

import { Config } from "../../OnClass/DataEditor/configLoader";

export default class Noticeboard{
    notices: notices;
    constructor(){
        console.log('Noticeboard initialized');
        const config = new Config('noticeboard.json');
        const notices = config.loadConfig();
        console.log('Loaded notices', notices);
        this.notices = notices;
    };
    getNoticeList() {
        const noticeList = Object.keys(this.notices).map((key) => {
            return this.notices[key].title;
        });
        return noticeList;
    };
    getNoticebyId(id: string) {
        const notice = this.notices[id];
        if (!notice) {
            console.log('Notice not found');
            return null;
        }
        return notice;
    }
}