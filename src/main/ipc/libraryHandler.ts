import LibraryService from '@main/services/LibraryService';
import { ipcMain, IpcMainInvokeEvent } from 'electron';

export function handleLibraryRequests() {
	const libraryService = LibraryService.getInstance();

	ipcMain.handle('library:get-all-books', async (event: IpcMainInvokeEvent) =>
		libraryService.getAllBooks(),
	);

	ipcMain.handle(
		'library:get-favorite-books',
		async (event: IpcMainInvokeEvent) => libraryService.getFavoriteBooks(),
	);
}
