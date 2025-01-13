import App from '@renderer/App';
import '@styles/global.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';

window.electronAPI.config
	.get('theme')
	.then((theme) =>
		document.documentElement.setAttribute('data-theme', theme),
	);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
