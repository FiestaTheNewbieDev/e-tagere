import cn from '@utils/cn';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

export type ContextMenuOption = {
	label: React.ReactNode;
	action: () => void;
	options?: ContextMenuOptions;
};

export type ContextMenuSeparator = {
	separator: true;
};

export type ContextMenuOptions = (ContextMenuOption | ContextMenuSeparator)[];

export type ContextMenuPosition = {
	x: React.CSSProperties['left'];
	y: React.CSSProperties['top'];
};

interface IProps {
	className?: string;
	visible: boolean;
	options: ContextMenuOptions;
	position: ContextMenuPosition;
	onClose: () => void;
	onSubmenuEnter?: () => void;
	onSubmenuLeave?: () => void;
}

export default function ContextMenu({
	className,
	onSubmenuEnter = () => void 0,
	onSubmenuLeave = () => void 0,
	...props
}: IProps) {
	const menuRef = useRef<HTMLDivElement>(null);
	const [submenu, setSubmenu] = useState<{
		options: ContextMenuOptions;
		position: ContextMenuPosition;
	} | null>(null);
	const [hoveredItem, setHoveredItem] = useState<ContextMenuOption | null>(
		null,
	);
	const [hoveredSubmenu, setHoveredSubmenu] = useState(false);

	const classNames = cn('context-menu', className);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				props.onClose();
				setSubmenu(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [props.onClose]);

	const handleMouseEnter = (
		event: React.MouseEvent<HTMLLIElement>,
		option: ContextMenuOption,
	) => {
		if (option.options) {
			const rect = (event.target as HTMLElement).getBoundingClientRect();

			setSubmenu({
				options: option.options,
				position: {
					x: rect.right,
					y: `calc(${rect.top}px - var(--spacing-xsmall))`,
				},
			});
		}
		setHoveredItem(option);
		onSubmenuEnter();
	};

	const handleMouseLeave = () => {
		if (!hoveredSubmenu && !hoveredItem) {
			setSubmenu(null);
		}
		setHoveredItem(null);
		onSubmenuLeave();
	};

	const handleSubMenuMouseEnter = () => {
		setHoveredSubmenu(true);
	};

	const handleSubMenuMouseLeave = () => {
		setHoveredSubmenu(false);
	};

	if (!props.visible) return null;

	return (
		<div
			ref={menuRef}
			className={classNames}
			style={{ top: props.position.y, left: props.position.x }}
		>
			<ul>
				{props.options.map((option, index) =>
					'separator' in option ? (
						<div className="separator" key={index}></div>
					) : (
						<li
							key={index}
							onClick={option.action}
							onMouseEnter={(event) =>
								handleMouseEnter(event, option)
							}
							onMouseLeave={handleMouseLeave}
						>
							<span className="label">{option.label}</span>
							{option.options && (
								<ChevronRight className="submenu-icon" />
							)}
						</li>
					),
				)}
			</ul>
			{submenu && (
				<ContextMenu
					className="submenu"
					visible={true}
					options={submenu.options}
					position={submenu.position}
					onClose={() => setSubmenu(null)}
					onSubmenuEnter={handleSubMenuMouseEnter}
					onSubmenuLeave={handleSubMenuMouseLeave}
				/>
			)}
		</div>
	);
}
