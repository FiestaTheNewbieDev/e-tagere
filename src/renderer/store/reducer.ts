import libraryReducer from '@store/library/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
	library: libraryReducer,
});

export default reducer;
