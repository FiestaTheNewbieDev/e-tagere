import I18nService from '@main/services/I18nService';
import { ipcMain, IpcMainInvokeEvent } from 'electron';

export default function handleI18nRequests() {
	const i18nService = I18nService.getInstance();

	ipcMain.handle('i18n:get', async (event: IpcMainInvokeEvent, key: string) =>
		i18nService.getTranslation(key),
	);
}
