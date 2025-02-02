import { createContext, useCallback, useContext, useState } from 'react';

interface ILibraryContext {
	tab?: string;
	setTab: (tab: string) => void;
}

const LibraryContext = createContext<ILibraryContext>({} as ILibraryContext);

function LibraryProvider({ children }: { children: React.ReactNode }) {
	const [tab, _setTab] = useState<string>('ALL');
	const setTab = useCallback((tab: string) => _setTab(tab), []);

	const value: ILibraryContext = {
		tab,
		setTab,
	};

	return (
		<LibraryContext.Provider value={value}>
			{children}
		</LibraryContext.Provider>
	);
}

const useLibraryCtx = () => useContext(LibraryContext);

export default LibraryContext;
export { LibraryProvider, useLibraryCtx };
