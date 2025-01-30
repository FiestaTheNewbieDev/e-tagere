import { useReader } from '@contexts/ReaderContext';
import { Book } from '@myTypes/ebook';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';

export default function Reader() {
	const state: { book: Book } = useLocation().state;
	const { book, setBook } = useReader();

	useEffect(() => {
		setBook(state.book);
	}, [state]);

	return (
		<main className="reader">
			<div className="reader__content">{book.title}</div>
		</main>
	);
}
