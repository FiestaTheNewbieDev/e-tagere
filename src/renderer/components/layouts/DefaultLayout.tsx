import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import { LayoutProvider } from '@contexts/LayoutContext';

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutProvider>
			{children}
			<Navbar />
			<Sidebar />
		</LayoutProvider>
	);
}
