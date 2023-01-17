import { app, ipcMain, dialog} from 'electron';
import serve from 'electron-serve';
import { createWindow, getAllFiles } from './helpers';
import { shell } from 'electron';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 800,
    titleBarStyle: 'hidden'
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

//Routes
ipcMain.on('choose-directory', (event) => {
  dialog.showOpenDialog({
    properties: [
      "openDirectory"
    ]
  })
  .then((result) => {
    if (result.filePaths[0]) {
      try {
        let files = getAllFiles(result.filePaths[0])
        event.reply('chosen-directory', {currentDirectory: result.filePaths[0], files: files})
      } catch (e) {
        console.log("error", e)
      }
    }
    else {
      event.reply('chosen-directory', "No directory chosen")
    }
  })
})
