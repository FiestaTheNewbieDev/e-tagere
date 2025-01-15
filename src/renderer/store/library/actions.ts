import { librarySliceActions } from '@renderer/store/library/reducer';
import store from '@renderer/store/store';

export default class LibraryActions {
	static fetchAll(): Promise<void> {
		return LibraryActions.fetch('ALL');
	}

	static fetchFavorites(): Promise<void> {
		return LibraryActions.fetch('FAVORITES');
	}

	static async fetch(tab: string): Promise<void> {
		const state = store.getState().library[tab];

		if (state.status === 'FETCHING')
			return Promise.reject('Library is already being fetched');

		store.dispatch(librarySliceActions.startFetching({ tab }));

		try {
			let response;
			switch (tab) {
				case 'ALL':
					response = await window.electronAPI.library.getAll();
					break;
				case 'FAVORITES':
					response = await window.electronAPI.library.getFavorites();
					break;
				default:
					throw new Error('Invalid tab');
			}

			store.dispatch(
				librarySliceActions.fetchSuccess({ tab, books: response }),
			);
		} catch (error) {
			store.dispatch(librarySliceActions.fetchError({ tab }));
			return Promise.reject(error);
		}
	}
}
