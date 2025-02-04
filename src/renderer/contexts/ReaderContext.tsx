import { Book } from '@myTypes/ebook';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

interface IReaderContext {
	book: Book;
	setBook: (book: Book) => void;

	context: {
		isOpen: boolean;
		toggle: () => void;
		setIsOpen: (isOpen: boolean) => void;

		isHovered: boolean;
		setIsHovered: (isHovered: boolean) => void;
	};
}

const ReaderContext = createContext<IReaderContext>({} as IReaderContext);

const DISPLAY_DURATION = 1000 * 5;

function ReaderProvider({ children }: { children: ReactNode }) {
	const [book, _setBook] = useState<Book>({} as Book);
	const setBook = useCallback((book: Book) => _setBook(book), []);

	const [isOpen, _setIsOpen] = useState(true);
	const toggle = useCallback(() => _setIsOpen(!isOpen), []);
	const setIsOpen = useCallback((isOpen: boolean) => _setIsOpen(isOpen), []);

	const [isHovered, _setIsHovered] = useState(false);
	const setIsHovered = useCallback(
		(isHovered: boolean) => _setIsHovered(isHovered),
		[],
	);

	useEffect(() => {
		if (isOpen && !isHovered)
			setTimeout(() => setIsOpen(false), DISPLAY_DURATION);
	}, [isOpen, isHovered]);

	const value: IReaderContext = {
		book,
		setBook,

		context: {
			isOpen,
			toggle,
			setIsOpen,

			isHovered,
			setIsHovered,
		},
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
