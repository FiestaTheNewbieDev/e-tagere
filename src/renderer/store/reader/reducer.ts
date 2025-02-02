import sessionReducer from '@store/reader/session/reducer';
import TOCReducer from '@store/reader/toc/reducer';
import { combineReducers } from 'redux';

const readerReducer = combineReducers({
	session: sessionReducer,
	toc: TOCReducer,
});

export default readerReducer;
