import { TOCElement } from '@myTypes/ebook';
import genericInitialState, {
	GenericState,
} from '@store/generics/initialState';

export type TOCData = {
	toc: TOCElement[];
};

export type TOCState = GenericState<TOCData>;

const initialState: TOCState = {
	...genericInitialState,
	data: {
		toc: [],
	},
};

export default initialState;
