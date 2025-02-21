import { PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus, GenericState } from '@store/generics/initialState';

export const genericReducers = {
	startFetching: (state: GenericState<any>) => {
		state.status = FetchStatus.FETCHING;
	},
	fetchError: (state: GenericState<any>, action: PayloadAction<any>) => {
		state.status = FetchStatus.ERRORED;
		state.error = action.payload;
	},
	fetchSuccess: <T>(state: GenericState<any>, action: PayloadAction<T>) => {
		state.status = FetchStatus.FETCHED;
		state.data = action.payload;
	},
};
