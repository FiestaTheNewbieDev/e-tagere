import { Button } from '@components/Button';
import Spinner from '@components/Spinner';
import { useReaderCtx } from '@contexts/ReaderContext';
import { Book } from '@myTypes/ebook';
import ReaderActions from '@store/reader/actions';
import useReader from '@store/reader/selector';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';

const LOADING_STATUS = ['NOT_FETCHED', 'FETCHING'];

export default function Reader() {
	const state: { book: Book } = useLocation().state;
	const { book, setBook } = useReaderCtx();
	const { session } = useReader();

	useEffect(() => {
		if (state.book !== book) {
			setBook(state.book);
			fetchSession();
		}
	}, [state.book]);

	function fetchSession() {
		ReaderActions.fetchSession(state.book.id).catch(console.error);
	}

	return (
		<main className="reader">
			{session.status === 'FETCHED' && session.data && (
				<div
					className="reader__content"
					dangerouslySetInnerHTML={{
						__html: session.data.content,
					}}
				/>
			)}

			<div
				className="reader__loading-container"
				data-visible={LOADING_STATUS.includes(session.status)}
			>
				<Spinner />
			</div>

			<div
				className="reader__error-container"
				data-visible={session.status === 'ERRORED'}
			>
				<p>Oops, an error occurred!</p>
				<Button variant="secondary-outline" onClick={fetchSession}>
					Try again
				</Button>
			</div>
		</main>
	);
}
