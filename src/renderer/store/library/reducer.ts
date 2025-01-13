import { Book } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState, { LibraryState } from '@store/library/initialState';

export const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		startFetching: (state: LibraryState) => {
			state.status = 'FETCHING';
		},
		fetchError: (state: LibraryState) => {
			state.status = 'ERRORED';
		},
		fetchSuccess: (
			state: LibraryState,
			action: PayloadAction<{ books: Book[] }>,
		) => {
			state.status = 'FETCHED';
			state.data.books = action.payload.books;
		}
	},
});

export const librarySliceActions = librarySlice.actions;

export default librarySlice.reducer;
