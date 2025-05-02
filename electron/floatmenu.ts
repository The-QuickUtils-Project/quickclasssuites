import { BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import windowStateKeeper from "electron-window-state";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class floatMenu{
    private floatMenu: BrowserWindow | null;
    private winStateKeeper;
    constructor(mainWindow: BrowserWindow | null, VITE_DEV_SERVER_URL: string | undefined, RENDERER_DIST: string){
        this.winStateKeeper = windowStateKeeper({
            defaultHeight: 250,
            defaultWidth: 60,
            file: 'floatmenu-window-state.json'
        })
        this.floatMenu = new BrowserWindow({
            width: 60,
            height: 250,
            x: this.winStateKeeper.x,
            y: this.winStateKeeper.y,
            alwaysOnTop: true,
            skipTaskbar: true,
            frame: false,
            transparent: true,
            resizable: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.mjs'),
            }
        });
        this.winStateKeeper.manage(this.floatMenu);
        console.log(this.floatMenu.getPosition());
        this.floatMenu.on('move', ()=>{
            console.log(this.floatMenu?.getPosition());
        })
        this.floatMenu.setAlwaysOnTop(true, 'screen-saver');
        this.floatMenu.on('close', () => {
            if(this.floatMenu){
                this.winStateKeeper.saveState(this.floatMenu);
            }
        });
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
    saveState = () => {if(this.floatMenu){
        this.winStateKeeper.saveState(this.floatMenu);
    }};
    isVisible = ()=> {return this.floatMenu?.isVisible};
}
