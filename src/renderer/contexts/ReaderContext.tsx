import { Book } from '@myTypes/ebook';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

interface IReaderContext {
	book: Book;
	setBook: (book: Book) => void;
}

const ReaderContext = createContext<IReaderContext>({} as IReaderContext);

function ReaderProvider({ children }: { children: ReactNode }) {
	const [book, _setBook] = useState<Book>({} as Book);
	const setBook = useCallback((book: Book) => _setBook(book), []);

	const value: IReaderContext = {
		book,
		setBook,
	};

	return (
		<ReaderContext.Provider value={value}>
			{children}
		</ReaderContext.Provider>
	);
}

const useReaderCtx = () => useContext(ReaderContext);

export default ReaderContext;
export { ReaderProvider, useReaderCtx };
