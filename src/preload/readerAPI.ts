import { GetReadingSessionResponse } from '@services/ReaderService';
import { ipcRenderer } from 'electron';

export type ReaderAPI = {
	getReadingSession: typeof getReadingSession;
};

const getReadingSession = async (
	bookId: number,
): Promise<GetReadingSessionResponse> =>
	ipcRenderer.invoke('reader:get-reading-session', bookId);

const readerAPI: ReaderAPI = {
	getReadingSession,
};

export default readerAPI;
