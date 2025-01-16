import BookCard from '@components/BookCard';
import ContextMenu, {
	ContextMenuOptions,
	ContextMenuPosition,
} from '@components/ContextMenu';
import Spinner from '@components/Spinner';
import { useLayout } from '@contexts/LayoutContext';
import { Book } from '@prisma/client';
import LibraryActions from '@store/library/actions';
import useLibrary from '@store/library/selector';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const LOADING_STATUS = ['NOT_FETCHED', 'FETCHING'];

export default function Library({ tab = 'ALL' }: { tab?: string }) {
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
		LibraryActions.fetch(tab).catch(console.error);
	}, [tab]);

	function handleContextMenu(
		event: React.MouseEvent<HTMLDivElement>,
		book: Book,
	) {
		event.preventDefault();
		setContextMenuOptions([
			{
				label: 'Open',
				action: () => navigate('/reader', { state: { book } }),
			},
			{
				label: 'Open in Finder',
				action: () => window.electronAPI.dialog.openInFinder(book.path),
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
		]);
		setContextMenu({ x: event.clientX, y: event.clientY });
	}

	return (
		<main className="library">
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
		</main>
	);
}
