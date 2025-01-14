import { createSelector } from '@reduxjs/toolkit';
import { LibraryState } from '@renderer/store/library/initialState';
import { RootState } from '@renderer/store/store';
import { useSelector } from 'react-redux';

const getLibraryState = (state: RootState): LibraryState => state.library;

const _useLibrary = (tab: string) =>
	createSelector(getLibraryState, (state) => state[tab]);

const useLibrary = (tab: string) =>
	useSelector((state: RootState) => _useLibrary(tab)(state));

export default useLibrary;
