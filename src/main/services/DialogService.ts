import { BrowserWindow, dialog } from 'electron';

export default class DialogService {
	private static instance: DialogService;

	public static getInstance(): DialogService {
		if (!DialogService.instance) {
			DialogService.instance = new DialogService();
		}
		return DialogService.instance;
	}

	async importBooks(browserWindow: BrowserWindow): Promise<string[]> {
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog(
				browserWindow,
				{
					title: 'Import Books',
					buttonLabel: 'Import',
					properties: ['openFile', 'multiSelections'],
					filters: [{ name: 'EBooks', extensions: ['epub'] }],
				},
			);

			if (canceled) {
				return Promise.reject(new Error('No books selected'));
			}

			return filePaths;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async importFolder(browserWindow: BrowserWindow): Promise<string> {
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

			return filePaths[0];
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
