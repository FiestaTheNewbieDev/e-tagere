import { useReaderCtx } from '@contexts/ReaderContext';
import './style.scss';

export default function BottomNavbar() {
	const { context } = useReaderCtx();

	function handleHover() {
		context.setIsOpen(true);
	}

	return (
		<nav
			className="reader__bottom-navbar__container"
			onMouseEnter={handleHover}
		>
			<div
				className="reader__bottom-navbar"
				{...(context.isOpen && { 'data-open': true })}
			></div>
		</nav>
	);
}
