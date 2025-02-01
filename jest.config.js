/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.jest.json',
		},
	},
	projects: [
		{
			displayName: 'main',
			testMatch: ['<rootDir>/__tests__/main/**/*.test.ts'],
			testEnvironment: 'node',
			setupFilesAfterEnv: ['<rootDir>/jest.setup.main.js'],
			moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
				prefix: '<rootDir>/',
			}),
		},
		{
			displayName: 'renderer',
			testMatch: ['<rootDir>/__tests__/renderer/**/*.test.ts'],
			testEnvironment: 'jsdom',
			setupFilesAfterEnv: ['<rootDir>/jest.setup.renderer.js'],
			moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
				prefix: '<rootDir>/',
			}),
		},
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
