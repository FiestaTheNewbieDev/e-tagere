import store from '@store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: { children: ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}