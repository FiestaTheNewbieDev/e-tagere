import { FetchStatus } from '@store/generics/initialState';
import { sessionSliceActions } from '@store/reader/session/reducer';
import { tocSliceActions } from '@store/reader/toc/reducer';
import store from '@store/store';

export default class ReaderActions {
	static async fetchSession(bookId: number) {
		const state = store.getState().reader.session;

		if (state.status === FetchStatus.FETCHING) return;

		try {
			const response =
				await window.electronAPI.reader.getReadingSession(bookId);

			console.log(response.content);

			store.dispatch(sessionSliceActions.fetchSuccess(response));
		} catch (error) {
			store.dispatch(sessionSliceActions.fetchError(error));
			return Promise.reject(error);
		}
	}

	static async fetchTOC(bookId: number) {
		const state = store.getState().reader.toc;

		if (state.status === FetchStatus.FETCHING) return;

		try {
			console.log('Fetching TOC');
		} catch (error) {
			store.dispatch(tocSliceActions.fetchError(error));
			return Promise.reject(error);
		}
	}
}
