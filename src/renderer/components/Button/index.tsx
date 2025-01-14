import cn from '@utils/cn';
import { ButtonHTMLAttributes } from 'react';
import './style.scss';

type ExtraProps = {
	full?: boolean;
	variant?: 'primary' | 'secondary-outline' | 'transparent';
};

type Button = ButtonHTMLAttributes<HTMLElement> & ExtraProps;

export const Button: React.FC<Button> = ({
	children,
	className,
	full,
	variant = 'primary',
	...props
}) => {
	const classNames = cn('button', className);

	return (
		<button
			className={classNames}
			{...(full && { 'data-full': true })}
			data-variant={variant}
			{...props}
		>
			{children}
		</button>
	);
};
