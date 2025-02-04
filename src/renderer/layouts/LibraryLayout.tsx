import Navbar from '@components/library/Navbar';
import { LibraryProvider } from '@contexts/LibraryContext';

export default function LibraryLayout({
	children,
}: {
	children: React.ReactNode;
	tab?: string;
}) {
	return (
		<LibraryProvider>
			{children}
			<Navbar />
		</LibraryProvider>
	);
}
