import { Book } from '@prisma/client';
import { ipcRenderer } from 'electron';

export type LibraryAPI = {
	getAll: typeof getAll;
	getFavorites: typeof getFavorites;
};

const getAll = async (): Promise<Book[]> =>
	ipcRenderer.invoke('library:get-all-books');

const getFavorites = async (): Promise<Book[]> =>
	ipcRenderer.invoke('library:get-favorite-books');

const libraryAPI: LibraryAPI = {
	getAll,
	getFavorites,
};

export default libraryAPI;
