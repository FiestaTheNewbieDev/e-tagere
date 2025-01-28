import { Book } from '@prisma/client';
import genericInitialState, {
	GenericState,
} from '@store/generics/initialState';

export type LibraryState = {
	[key: string]: LibraryTabState;
};

export type LibraryTabState = GenericState<{
	books: Book[];
}>;

const tabInitialState: GenericState<{ books: Book[] }> = {
	...genericInitialState,
	data: { books: [] },
};

const initialState: LibraryState = {
	ALL: tabInitialState,
	LAST_READS: tabInitialState,
	FAVORITES: tabInitialState,
};

export default initialState;
export { tabInitialState };
