import * as Electron from 'electron';
import * as Ip from 'ip';
import { Config } from './../share/config';

process.env.HOST = `${Ip.address()}:${Config.PORT}`;

let mainWindow: Electron.BrowserWindow = null;

function createWindow(): void {
    mainWindow = new Electron.BrowserWindow({ fullscreen: true });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on('close', () => {
        mainWindow = null;
    });
}

Electron.app.on('ready', createWindow);
Electron.app.on('window-all-closed', Electron.app.quit);
Electron.app.on('activate', () => {
    if(mainWindow === null) {
        createWindow();
    }
});