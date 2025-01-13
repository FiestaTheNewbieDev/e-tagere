import { Book } from '@prisma/client';
import { ipcRenderer } from 'electron';

export type LibraryAPI = {
	getBooks: typeof getBooks;
};

const getBooks = async (): Promise<Book[]> =>
	ipcRenderer.invoke('library:get-books');

const libraryAPI: LibraryAPI = {
	getBooks,
};

export default libraryAPI;
