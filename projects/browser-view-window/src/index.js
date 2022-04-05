const { app, BrowserWindow } = require('electron')
const path = require('path')

// changes after Electron v14
const remoteMain = require('@electron/remote/main')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload', 'index.js')
        }
    })
    remoteMain.enable(mainWindow.webContents)

    mainWindow.loadFile('./src/views/main/index.html', {hash: 'Foo'})

    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    remoteMain.initialize()
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
