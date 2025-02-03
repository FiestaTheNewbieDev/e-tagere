import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { genericReducers } from '@store/generics/reducer';
import initialState, {
	TOCData,
	TOCState,
} from '@store/reader/toc/initialState';

const tocSlice = createSlice({
	name: 'TOC',
	initialState,
	reducers: {
		...genericReducers,
		fetchSuccess: (state: TOCState, action: PayloadAction<TOCData>) =>
			genericReducers.fetchSuccess<TOCData>(state, action),
	},
});

export const tocSliceActions = tocSlice.actions;

export default tocSlice.reducer;
