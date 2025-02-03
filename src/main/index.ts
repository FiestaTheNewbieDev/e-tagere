import { handleConfigRequests } from '@main/ipc/configHandler';
import { handleDialogRequests } from '@main/ipc/dialogHandler';
import handleI18nRequests from '@main/ipc/i18nHandler';
import { handleLibraryRequests } from '@main/ipc/libraryHandler';
import { handleReaderRequests } from '@main/ipc/readerHandler';
import { app, BrowserWindow } from 'electron';
import { installExtension, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const databasePath = path.join(app.getPath('userData'), 'db.sqlite3');
process.env.DATABASE_URL = `file:${databasePath}`;

const createWindow = async (): Promise<void> => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
		autoHideMenuBar: process.env.NODE_ENV === 'production',
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	process.env.NODE_ENV === 'development'
		? mainWindow.webContents.openDevTools()
		: null;

	process.env.NODE_ENV === 'development'
		? await installExtension(REDUX_DEVTOOLS)
		: null;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

handleDialogRequests();
handleConfigRequests();
handleI18nRequests();
handleLibraryRequests();
handleReaderRequests();
