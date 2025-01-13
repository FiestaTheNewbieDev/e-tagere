import { createSelector } from '@reduxjs/toolkit';
import { LibraryState } from '@renderer/store/library/initialState';
import { RootState } from '@renderer/store/store';
import { useSelector } from 'react-redux';

const getLibraryState = (state: LibraryState): LibraryState => state;

const _useLibrary = createSelector(getLibraryState, (state) => state);

const useLibrary = () =>
	useSelector((state: RootState) => _useLibrary(state.library));

export default useLibrary;
