import LibraryService from '@services/LibraryService';
import { ipcMain } from 'electron';

export function handleLibraryRequests() {
	const libraryService = LibraryService.getInstance();

	ipcMain.handle('library:get-all-books', async () =>
		libraryService.getAllBooks(),
	);

	ipcMain.handle('library:get-favorite-books', async () =>
		libraryService.getFavoriteBooks(),
	);
}
