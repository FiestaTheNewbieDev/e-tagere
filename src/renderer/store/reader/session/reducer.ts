import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { genericReducers } from '@store/generics/reducer';
import initialState, {
	SessionData,
	SessionState,
} from '@store/reader/session/initialState';

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		...genericReducers,
		fetchSuccess: (
			state: SessionState,
			action: PayloadAction<SessionData>,
		) => genericReducers.fetchSuccess<SessionData>(state, action),
	},
});

export const sessionSliceActions = sessionSlice.actions;

export default sessionSlice.reducer;
