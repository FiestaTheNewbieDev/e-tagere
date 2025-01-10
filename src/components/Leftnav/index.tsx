import cn from '@/misc/cn';
import { useLeftnav } from '@contexts/LayoutContext';
import { BookOpen, History, Settings, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const Leftnav: React.FC = () => {
	const navigate = useNavigate();
	const { isOpen, setIsOpen } = useLeftnav();

	function handleMouseEnter() {
		setIsOpen(true);
	}

	function handleMouseLeave() {
		setIsOpen(false);
	}

	return (
		<aside className="leftnav__container">
			<nav
				className="leftnav"
				{...(isOpen && { 'data-expanded': true })}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div
					className="leftnav__header"
					{...(isOpen && { 'data-expanded': true })}
				>
					<img />
					<h1>E-tagère</h1>
				</div>
				<div className="leftnav__main">
					<ul className="top">
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/')}
							urls={['/']}
						>
							<BookOpen />
							<span>All books</span>
						</NavItem>
						{/* <NavItem
							expanded={isOpen}
							onClick={() => navigate('/reader')}
							urls={['/last-read']}
						>
							<History />
							<span>Last read</span>
						</NavItem>
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/')}
							urls={['/favorite']}
						>
							<Star />
							<span>Favorite</span>
						</NavItem> */}
					</ul>
					<ul className="bottom">
						<div className="separator" />
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/settings')}
							urls={['/settings']}
						>
							<Settings />
							<span>Settings</span>
						</NavItem>
					</ul>
				</div>
			</nav>
		</aside>
	);
};

Leftnav.displayName = 'Leftnav';

type NavItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
	expanded: boolean;
	urls: string[];
};

const NavItem: React.FC<NavItemProps> = ({
	children,
	className,
	expanded,
	urls,
	...props
}) => {
	const classNames = cn('leftnav__nav-item', className);

	const [active, setActive] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (urls.length) {
			setActive(
				urls.some(
					(url) =>
						location.pathname === url ||
						location.pathname.startsWith(`${url}/`),
				),
			);
		}
	}, [location.pathname, urls]);

	return (
		<li
			className={classNames}
			{...props}
			{...(expanded && { 'data-expanded': true })}
			{...(active && { 'data-active': true })}
		>
			{children}
		</li>
	);
};

NavItem.displayName = 'NavItem';

export default Leftnav;
