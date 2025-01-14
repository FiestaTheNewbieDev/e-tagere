import { Book } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
			state[tab].status = 'FETCHING';
		},
		fetchError: (
			state: LibraryState,
			action: PayloadAction<{ tab: string }>,
		) => {
			const tab = action.payload.tab;

			if (!state[tab]) state[tab] = tabInitialState;
			state[tab].status = 'ERRORED';
		},
		fetchSuccess: (
			state: LibraryState,
			action: PayloadAction<{ tab: string; books: Book[] }>,
		) => {
			const tab = action.payload.tab;

			if (!state[tab]) state[tab] = tabInitialState;
			state[tab].status = 'FETCHED';
			state[tab].data.books = action.payload.books;
		},
	},
});

export const librarySliceActions = librarySlice.actions;

export default librarySlice.reducer;
