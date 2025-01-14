import CopyWebpackPlugin from 'copy-webpack-plugin';
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
	new ForkTsCheckerWebpackPlugin({
		logger: 'webpack-infrastructure',
	}),
	new CopyWebpackPlugin({
		patterns: [
			{
				from: path.join(__dirname, 'node_modules/.prisma'),
				to: '.prisma',
			},
		],
	}),
];
