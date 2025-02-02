import { ReaderProvider } from '@contexts/ReaderContext';

export default function ReaderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ReaderProvider>
			{children}
			{/* <ReaderNavbar /> */}
		</ReaderProvider>
	);
}
