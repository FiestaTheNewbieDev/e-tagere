import path from 'path';

export const alias = {
	'@main': path.resolve(__dirname, 'src/main'),
	'@services': path.resolve(__dirname, 'src/main/services'),
	'@preload': path.resolve(__dirname, 'src/preload'),
	'@renderer': path.resolve(__dirname, 'src/renderer'),
	'@assets': path.resolve(__dirname, 'src/renderer/assets'),
	'@components': path.resolve(__dirname, 'src/renderer/components'),
	'@contexts': path.resolve(__dirname, 'src/renderer/contexts'),
	'@store': path.resolve(__dirname, 'src/renderer/store'),
	'@styles': path.resolve(__dirname, 'src/renderer/styles'),
	'@views': path.resolve(__dirname, 'src/renderer/views'),
	'@myTypes': path.resolve(__dirname, 'src/types'),
	'@utils': path.resolve(__dirname, 'src/utils'),
};
