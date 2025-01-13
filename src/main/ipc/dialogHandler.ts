import DialogService from '@main/services/DialogService';
import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';

export function handleDialogRequests() {
	const dialogService = DialogService.getInstance();

	ipcMain.handle('dialog:import-books', (event: IpcMainInvokeEvent) => {
		const browserWindow = BrowserWindow.fromWebContents(event.sender);
		if (!browserWindow) {
			throw new Error('BrowserWindow not found');
		}
		return dialogService.importBooks(browserWindow);
	});

	ipcMain.handle('dialog:import-folder', (event: IpcMainInvokeEvent) => {
		const browserWindow = BrowserWindow.fromWebContents(event.sender);
		if (!browserWindow) {
			throw new Error('BrowserWindow not found');
		}
		return dialogService.importFolder(browserWindow);
	});
}
