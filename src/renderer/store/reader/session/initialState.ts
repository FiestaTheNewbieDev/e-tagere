import genericInitialState, {
	GenericState,
} from '@store/generics/initialState';

export type SessionData = {
	session: {};
};

export type SessionState = GenericState<SessionData>;

const initialState: SessionState = {
	...genericInitialState,
	data: {
		session: {},
	},
};

export default initialState;
