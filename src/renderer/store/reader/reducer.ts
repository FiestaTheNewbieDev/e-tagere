import { createSlice } from '@reduxjs/toolkit';
import { genericReducers } from '@store/generics/reducer';
import initialState, { ReaderData } from '@store/reader/initialState';

const readerSlice = createSlice({
	name: 'reader',
	initialState,
	reducers: {
		...genericReducers,
		fetchSuccess: genericReducers.fetchSuccess<ReaderData>,
	},
});

export const readerSliceActions = readerSlice.actions;

export default readerSlice.reducer;
