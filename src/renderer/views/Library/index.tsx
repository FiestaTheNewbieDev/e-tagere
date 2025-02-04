import { Button } from '@components/Button';
import ContextMenu, {
	ContextMenuOptions,
	ContextMenuPosition,
} from '@components/ContextMenu';
import BookCard from '@components/library/BookCard';
import Spinner from '@components/Spinner';
import { useLayout } from '@contexts/LayoutContext';
import { useLibraryCtx } from '@contexts/LibraryContext';
import { Book } from '@myTypes/ebook';
import LibraryActions from '@store/library/actions';
import useLibrary from '@store/library/selector';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const LOADING_STATUS = ['NOT_FETCHED', 'FETCHING'];

export default function Library({ tab = 'ALL' }: { tab?: string }) {
	const { setTab } = useLibraryCtx();
	const library = useLibrary(tab);
	const books = library.data.books;
	const layout = useLayout();
	const navigate = useNavigate();

	const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
		null,
	);
	const [contextMenuOptions, setContextMenuOptions] =
		useState<ContextMenuOptions>([]);

	useEffect(() => {
		setTab(tab);
		fetchLibrary();
	}, [tab]);

	function fetchLibrary() {
		LibraryActions.fetch(tab).catch(console.error);
	}

	function getContextMenuOptions(books: Book[]) {
		if (books.length > 0) return [];

		return [
			{
				label: 'Open',
				action: () =>
					navigate('/reader', { state: { book: books[0] } }),
			},
			{
				label: 'Open in Finder',
				action: () =>
					window.electronAPI.dialog.openInFinder(books[0].path),
			},
			// {
			// 	label: 'Add to Favorites',
			// 	action: () => alert(`Add ${book.title} to favorites`),
			// },
			// {
			// 	label: 'Edit',
			// 	action: () => alert(`Edit ${book.title}`),
			// },
			// {
			// 	label: 'Select',
			// 	action: () => alert(`Select ${book.title}`),
			// },
			// {
			// 	separator: true,
			// },
			// {
			// 	label: 'Delete',
			// 	action: () => alert(`Delete ${book.title}`),
			// },
		];
	}

	function handleContextMenu(
		event: React.MouseEvent<HTMLDivElement>,
		book: Book,
	) {
		event.preventDefault();
		setContextMenuOptions(getContextMenuOptions([book]));
		setContextMenu({ x: event.clientX, y: event.clientY });
	}

	return (
		<main className="library">
			{library.status === 'FETCHED' && !!library.data.books.length && (
				<>
					{layout.library.display === 'grid' && (
						<div className="library__cards-container__grid">
							{books.map((book) => (
								<BookCard
									key={book.id}
									book={book}
									onContextMenu={(event) =>
										handleContextMenu(event, book)
									}
								/>
							))}
						</div>
					)}

					{layout.library.display === 'list' && (
						<div className="library__cards-container__list"></div>
					)}
				</>
			)}

			<ContextMenu
				visible={!!contextMenu}
				options={contextMenuOptions}
				position={contextMenu || { x: -999, y: -999 }}
				onClose={() => setContextMenu(null)}
			/>

			<div
				className="library__loading-container"
				data-visible={LOADING_STATUS.includes(library.status)}
			>
				<Spinner />
			</div>

			<div
				className="library__error-container"
				data-visible={library.status === 'ERRORED'}
			>
				<p>Oops, an error occurred!</p>
				<Button variant="secondary-outline" onClick={fetchLibrary}>
					Try again
				</Button>
			</div>
		</main>
	);
}
