import libraryReducer from '@store/library/reducer';
import readerReducer from '@store/reader/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
	library: libraryReducer,
	reader: readerReducer,
});

export default reducer;
