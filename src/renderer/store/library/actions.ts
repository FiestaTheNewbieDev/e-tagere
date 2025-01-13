import { librarySliceActions } from '@renderer/store/library/reducer';
import store from '@renderer/store/store';

export default class LibraryActions {
	static async fetchLibrary(): Promise<void> {
		const state = store.getState().library;

		if (state.status === 'FETCHING')
			return Promise.reject('Library is already being fetched');

		store.dispatch(librarySliceActions.startFetching());

		try {
			const response = await window.electronAPI.library.getBooks();

			store.dispatch(
				librarySliceActions.fetchSuccess({ books: response }),
			);
		} catch (error) {
			store.dispatch(librarySliceActions.fetchError());
			return Promise.reject(error);
		}
	}
}
