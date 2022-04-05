// const {
//     contextBridge,
//     ipcRenderer,
//     BrowserView,
//     BrowserWindow
// } = require("electron")

const electron = require('electron');
const { contextBridge, ipcRenderer } = electron
const { BrowserView, BrowserWindow, getCurrentWindow } = require('@electron/remote')

contextBridge.exposeInMainWorld(
    'api',
    {
        addNewView: function (bounds, url) {
            const view = new BrowserView(),
                win = getCurrentWindow();

            win.addBrowserView(view)

            view.setBounds(bounds)
            view.setAutoResize({ width: true, height: true })
            view.webContents.loadURL(url)
            return view
        },
        popView: function () {
            const view = getCurrentWindow().getBrowserViews()[0]
            if (!view) console.log('no view')
            console.log(view)


            const newWin = new BrowserWindow()
            newWin.loadFile('./src/views/main/index.html', { hash: `Bar_${view.getBounds().y}` })

            getCurrentWindow().removeBrowserView(view)

            newWin.addBrowserView(view)
        }
    }
)