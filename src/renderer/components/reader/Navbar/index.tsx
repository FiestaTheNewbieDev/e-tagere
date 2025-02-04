import { useReaderCtx } from '@contexts/ReaderContext';
import './style.scss';

export default function Navbar() {
	const { book, context } = useReaderCtx();

	function handleHover() {
		context.setIsOpen(true);
	}

	return (
		<nav className="reader__navbar__container" onMouseEnter={handleHover}>
			<h1 className="book-title">{book.title}</h1>
			<div
				className="reader__navbar"
				{...(context.isOpen && { 'data-open': true })}
			></div>
		</nav>
	);
}
