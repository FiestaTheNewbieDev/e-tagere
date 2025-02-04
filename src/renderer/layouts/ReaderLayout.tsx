import BottomNavbar from '@components/reader/BottomNavbar';
import Navbar from '@components/reader/Navbar';
import { ReaderProvider } from '@contexts/ReaderContext';

export default function ReaderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ReaderProvider>
			{children}
			<Navbar />
			<BottomNavbar />
		</ReaderProvider>
	);
}
