import LibraryService from '@main/services/LibraryService';
import ALLOWED_EBOOK_EXTENSIONS from '@utils/allowedEbookExtensions';
import { BrowserWindow, dialog, shell } from 'electron';

export default class DialogService {
	private static instance: DialogService;
	private libraryService: LibraryService;

	constructor() {
		this.libraryService = LibraryService.getInstance();
	}

	public static getInstance(): DialogService {
		if (!DialogService.instance) {
			DialogService.instance = new DialogService();
		}
		return DialogService.instance;
	}

	async importBooks(browserWindow: BrowserWindow) {
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog(
				browserWindow,
				{
					title: 'Import Books',
					buttonLabel: 'Import',
					properties: ['openFile', 'multiSelections'],
					filters: [
						{
							name: 'EBooks',
							extensions: ALLOWED_EBOOK_EXTENSIONS,
						},
					],
				},
			);

			if (canceled) {
				return Promise.reject(new Error('No books selected'));
			}

			return this.libraryService.indexFiles(filePaths);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async importFolder(browserWindow: BrowserWindow) {
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog(
				browserWindow,
				{
					title: 'Import Folder',
					buttonLabel: 'Folder',
					properties: ['openDirectory'],
				},
			);

			if (canceled || filePaths.length === 0) {
				return Promise.reject(new Error('No folder selected'));
			}

			const dir = filePaths[0];

			return this.libraryService.indexDirectory(dir);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async openInFinder(path: string) {
		shell.showItemInFolder(path);
	}
}
