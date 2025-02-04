import { Button } from '@components/Button';
import { useReaderCtx } from '@contexts/ReaderContext';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export default function Navbar() {
	const navigate = useNavigate();
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
			>
				<div className="left">
					<Button variant="primary" onClick={() => navigate('/')}>
						<Home />
						Go back to library
					</Button>
				</div>
				<div className="right"></div>
			</div>
		</nav>
	);
}
