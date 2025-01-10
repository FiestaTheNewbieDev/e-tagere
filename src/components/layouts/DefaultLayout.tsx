import { LayoutProvider } from '@/contexts/LayoutContext';
import Leftnav from '@components/Leftnav';
import Topnav from '@components/Topnav';

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutProvider>
			{children}
			<Topnav />
			<Leftnav />
		</LayoutProvider>
	);
}
