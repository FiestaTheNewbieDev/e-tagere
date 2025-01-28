import genericInitialState, {
	GenericState,
} from '@store/generics/initialState';

export type ReaderData = {
	currentChapter: {
		href: string;
		content: string;
	} | null;
};

export type ReaderState = GenericState<ReaderData>;

const initialState: ReaderState = {
	...genericInitialState,
	data: {
		currentChapter: null,
	},
};

export default initialState;
