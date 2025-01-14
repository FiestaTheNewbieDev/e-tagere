import { useSidebar } from '@contexts/LayoutContext';
import useLibrary from '@store/library/selector';
import cn from '@utils/cn';
import { BookOpen, History, Info, Settings, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const Sidebar: React.FC = () => {
	const navigate = useNavigate();
	const { isOpen, setIsOpen } = useSidebar();
	const books = useLibrary('ALL').data.books;

	function handleMouseEnter() {
		setIsOpen(true);
	}

	function handleMouseLeave() {
		setIsOpen(false);
	}

	return (
		<aside className="sidebar__container">
			<nav
				className="sidebar"
				{...(isOpen && { 'data-expanded': true })}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div
					className="sidebar__header"
					{...(isOpen && { 'data-expanded': true })}
				>
					<img />
					<h1>
						<span>e</span>-tagère
					</h1>
				</div>
				<div className="sidebar__main">
					<ul className="top">
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/')}
							urls={['/']}
						>
							<BookOpen />
							<span>All books ({books.length})</span>
						</NavItem>
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/last-reads')}
							urls={['/last-reads']}
						>
							<History />
							<span>Last reads</span>
						</NavItem>
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/favorites')}
							urls={['/favorites']}
						>
							<Star />
							<span>Favorites</span>
						</NavItem>
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
						<NavItem
							expanded={isOpen}
							onClick={() => navigate('/about')}
							urls={['/about']}
						>
							<Info />
							<span>About</span>
						</NavItem>
					</ul>
				</div>
			</nav>
		</aside>
	);
};

Sidebar.displayName = 'Sidebar';

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
	const classNames = cn('sidebar__nav-item', className);

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

export default Sidebar;
