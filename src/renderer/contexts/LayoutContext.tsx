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
	library: {
		display: "grid" | "list";
		setDisplay: (display: "grid" | "list") => void;
	}
}

const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext);

function LayoutProvider({ children }: { children: ReactNode }) {
	const [isOpen, _setIsOpen] = useState(false);
	const toggle = useCallback(() => _setIsOpen(!isOpen), []);
	const setIsOpen = useCallback((isOpen: boolean) => _setIsOpen(isOpen), []);

	const [display, _setDisplay] = useState<"grid" | "list">("grid");
	const setDisplay = useCallback((display: "grid" | "list") => _setDisplay(display), []);

	const value: ILayoutContext = {
		sidebar: {
			isOpen,
			toggle,
			setIsOpen,
		},
		library: {
			display,
			setDisplay,
		}
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
