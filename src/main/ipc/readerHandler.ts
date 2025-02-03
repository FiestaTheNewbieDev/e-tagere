import ReaderService from '@services/ReaderService';
import { ipcMain, IpcMainInvokeEvent } from 'electron';

export function handleReaderRequests() {
	let readerService: ReaderService | null = null;

	ipcMain.handle(
		'reader:get-reading-session',
		async (event: IpcMainInvokeEvent, bookId: number) => {
			readerService = ReaderService.getInstance(bookId);

			return readerService.getReadingSession();
		},
	);
}
