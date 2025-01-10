import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

interface ILayoutContext {
	leftnav: {
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
		leftnav: {
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
const useLeftnav = () => useLayout().leftnav;

export default LayoutContext;
export { LayoutProvider, useLayout, useLeftnav };
