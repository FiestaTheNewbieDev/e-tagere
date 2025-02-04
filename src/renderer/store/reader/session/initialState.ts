import { ReadingSession } from '@prisma/client';
import genericInitialState, {
	GenericState,
} from '@store/generics/initialState';

type HTMLString = string;

export type SessionData = {
	session: ReadingSession;
	content: HTMLString;
};

export type SessionState = GenericState<SessionData | null>;

const initialState: SessionState = {
	...genericInitialState,
	data: null,
};

export default initialState;
