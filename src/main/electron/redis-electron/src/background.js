'use strict'

import {app, protocol, BrowserWindow, Menu, globalShortcut} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])

const platform = process.platform
let appStarted = false
let serverProcess
if (platform === 'win32') {
  serverProcess = require('child_process').spawn('cmd.exe', ['/c', 'redis-client.bat'], {
    cwd: app.getAppPath() + '/bin'
  })
} else {
  const chmod = require('child_process').spawn('chmod', ['+x', app.getAppPath() + "/bin/redis-client"]);
  chmod.on('close', (code => {
    serverProcess = require('child_process').spawn(app.getAppPath() + "/bin/redis-client")
  }))

}

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.toggleDevTools()
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', (e) => {
  if (serverProcess && process.platform !== 'darwin') {
    e.preventDefault()
    const kill = require('tree-kill')
    kill(serverProcess.pid, 'SIGTERM', function () {
      console.log('Server process killed')
      serverProcess = null
      app.quit()
    })
  } else {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0 && appStarted) createWindow()
})

let appUrl = 'http://localhost:8081/redis';

const startUp = function () {
  const requestPromise = require('minimal-request-promise')
  requestPromise.get(appUrl).then(function (response) {
    console.log(response);
    console.log('Server started!');
    createWindow();
    appStarted = true
  }, function (response) {
    console.log(response)
    console.log('Waiting for the server start...');
    setTimeout(function () {
      startUp()
    }, 500)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  startUp()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
