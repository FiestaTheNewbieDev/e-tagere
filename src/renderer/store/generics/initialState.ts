export enum FetchStatus {
	NOT_FETCHED = 'NOT_FETCHED',
	FETCHING = 'FETCHING',
	FETCHED = 'FETCHED',
	ERRORED = 'ERRORED',
}

export type GenericState<T> = {
	status: FetchStatus;
	data: T;
	error?: any;
};

const genericInitialState: GenericState<unknown> = {
	status: FetchStatus.NOT_FETCHED,
	data: {},
};

export default genericInitialState;
