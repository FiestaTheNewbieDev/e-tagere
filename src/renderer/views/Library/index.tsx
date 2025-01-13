import BookCard from '@components/BookCard';
import LibraryActions from '@store/library/actions';
import useLibrary from '@store/library/selector';
import { useEffect } from 'react';
import './style.scss';

export default function Library() {
	const library = useLibrary();
	const books = library.data.books;

	useEffect(() => {
		LibraryActions.fetchLibrary().catch(console.warn);
	}, []);

	return (
		<main className="library">
			<div className="library__cards-container">
				{books.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</div>
		</main>
	);
}
