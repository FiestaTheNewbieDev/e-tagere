import { ReadingSession } from '@prisma/client';
import genericInitialState, {
	GenericState,
} from '@store/generics/initialState';

export type SessionData = {
	session: ReadingSession;
	content: string;
};

export type SessionState = GenericState<SessionData | null>;

const initialState: SessionState = {
	...genericInitialState,
	data: null,
};

export default initialState;
