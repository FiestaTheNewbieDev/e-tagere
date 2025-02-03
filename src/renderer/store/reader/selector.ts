import { createSelector } from '@reduxjs/toolkit';
import { SessionState } from '@store/reader/session/initialState';
import { TOCState } from '@store/reader/toc/initialState';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

type ReaderState = {
	session: SessionState;
	toc: TOCState;
};

const getReaderState = (state: RootState): ReaderState => state.reader;

const _useReader = createSelector(
	getReaderState,
	(state: ReaderState) => state,
);

const useReader = (): ReaderState =>
	useSelector((state: RootState) => _useReader(state));

export default useReader;
