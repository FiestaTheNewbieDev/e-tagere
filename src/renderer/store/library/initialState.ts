import { Book } from '@prisma/client';

type Status = 'NOT_FETCHED' | 'FETCHING' | 'FETCHED' | 'ERRORED';

export type LibraryState = {
	[key: string]: LibraryTabState;
};

export type LibraryTabState = {
	status: Status;
	data: {
		books: Book[];
	};
};

const tabInitialState: LibraryTabState = {
	status: 'NOT_FETCHED',
	data: {
		books: [],
	},
};

const initialState: LibraryState = {
	ALL: tabInitialState,
	LAST_READS: tabInitialState,
	FAVORITES: tabInitialState,
};

export default initialState;
export { tabInitialState };
