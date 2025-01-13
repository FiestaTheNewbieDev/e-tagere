import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Book } from '@prisma/client';

interface IProps {
	book: Book;
}

export default function BookCard({ book }: IProps) {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/reader', { state: { book } });
	}

	return (
		<div className="book-card" onClick={handleClick}>
			<img className="cover" src={book.cover || ""} alt={book.title} />
			<label>{book.title}</label>
			<div className="separator" />
			<small>{book.author}</small>
		</div>
	);
}
