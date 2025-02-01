import LibraryService from '@services/LibraryService';
import AbstractSingleton from '@utils/AbstractSingleton';
import ALLOWED_EBOOK_EXTENSIONS from '@utils/constants/allowedEbookExtensions';
import { BrowserWindow, dialog, shell } from 'electron';

export default class DialogService extends AbstractSingleton {
	private libraryService: LibraryService;

	constructor() {
		super();

		this.libraryService = LibraryService.getInstance();
	}

	public static getInstance(): DialogService {
		return DialogService._getInstance<DialogService>();
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
				return;
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
				return;
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
