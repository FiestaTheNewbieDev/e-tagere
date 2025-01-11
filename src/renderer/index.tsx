import App from '@renderer/App';
import '@styles/global.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;

window.electronAPI.config
	.get('theme')
	.then((theme) => rootElement.setAttribute('data-theme', theme));

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
