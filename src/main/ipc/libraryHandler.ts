import LibraryService from '@main/services/LibraryService';
import { ipcMain, IpcMainInvokeEvent } from 'electron';

export function handleLibraryRequests() {
	const libraryService = LibraryService.getInstance();

	ipcMain.handle('library:get-books', async (event: IpcMainInvokeEvent) =>
		libraryService.getBooks(),
	);
}
