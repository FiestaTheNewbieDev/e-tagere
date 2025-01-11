import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

interface ILayoutContext {
	sidebar: {
		isOpen: boolean;
		toggle: () => void;
		setIsOpen: (isOpen: boolean) => void;
	};
}

const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext);

function LayoutProvider({ children }: { children: ReactNode }) {
	const [isOpen, _setIsOpen] = useState(false);
	const toggle = useCallback(() => _setIsOpen(!isOpen), []);
	const setIsOpen = useCallback((isOpen: boolean) => _setIsOpen(isOpen), []);

	const value: ILayoutContext = {
		sidebar: {
			isOpen,
			toggle,
			setIsOpen,
		},
	};

	return (
		<LayoutContext.Provider value={value}>
			{children}
		</LayoutContext.Provider>
	);
}

const useLayout = () => useContext(LayoutContext);
const useSidebar = () => useLayout().sidebar;

export default LayoutContext;
export { LayoutProvider, useLayout, useSidebar };
