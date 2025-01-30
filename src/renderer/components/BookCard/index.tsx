import { Book } from '@myTypes/ebook';
import { useNavigate } from 'react-router-dom';
import './style.scss';

interface IProps {
	onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
	book: Book;
}

export default function BookCard({ book, ...props }: IProps) {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/reader', { state: { book } });
	}

	return (
		<div
			className="book-card"
			onClick={handleClick}
			onContextMenu={props.onContextMenu}
		>
			<img className="cover" src={book.cover || ''} alt={book.title} />
			<label>{book.title}</label>
			<div className="separator" />
			<small>{book.author}</small>
		</div>
	);
}
