import App from '@/app/App';
import '@styles/global.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;
rootElement.setAttribute('data-theme', 'light');

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
