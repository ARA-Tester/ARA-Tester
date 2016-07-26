import * as Electron from 'electron';

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