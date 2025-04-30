import { BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class floatMenu{
    private floatMenu: BrowserWindow | null;
    constructor(mainWindow: BrowserWindow | null, VITE_DEV_SERVER_URL: string | undefined, RENDERER_DIST: string){
        this.floatMenu = new BrowserWindow({
            width: 60,
            height: 250,
            alwaysOnTop: true,
            skipTaskbar: true,
            frame: false,
            transparent: true,
            resizable: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.mjs'),
            }
        })
        this.floatMenu.setAlwaysOnTop(true, 'screen-saver');
        if (VITE_DEV_SERVER_URL) {
            this.floatMenu.loadURL(VITE_DEV_SERVER_URL + '/floatmenu')
          } else {
            this.floatMenu.loadFile(path.join(RENDERER_DIST, 'floatmenu.html'))
          }
        ipcMain.handle("floatMenu.showMainWindow", ()=>{
            mainWindow?.show()
        })
    };
    hide = ()=> this.floatMenu?.hide();
    show = ()=> this.floatMenu?.show();
    isVisible = ()=> {return this.floatMenu?.isVisible};
}
