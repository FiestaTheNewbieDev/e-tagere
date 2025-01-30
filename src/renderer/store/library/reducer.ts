import { Book } from '@myTypes/ebook';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus } from '@store/generics/initialState';
import initialState, {
	LibraryState,
	tabInitialState,
} from '@store/library/initialState';

export const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		startFetching: (
			state: LibraryState,
			action: PayloadAction<{ tab: string }>,
		) => {
			const tab = action.payload.tab;

			if (!state[tab]) state[tab] = tabInitialState;
			state[tab].status = FetchStatus.FETCHING;
		},
		fetchError: (
			state: LibraryState,
			action: PayloadAction<{ tab: string }>,
		) => {
			const tab = action.payload.tab;

			if (!state[tab]) state[tab] = tabInitialState;
			state[tab].status = FetchStatus.ERRORED;
		},
		fetchSuccess: (
			state: LibraryState,
			action: PayloadAction<{ tab: string; books: Book[] }>,
		) => {
			const tab = action.payload.tab;
			const books = action.payload.books;

			if (!state[tab]) state[tab] = tabInitialState;
			state[tab].status = FetchStatus.FETCHED;
			state[tab].data.books = books;
		},
	},
});

export const librarySliceActions = librarySlice.actions;

export default librarySlice.reducer;
