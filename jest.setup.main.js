jest.mock('electron', () => ({
	app: {
		isReady: jest.fn(() => true),
		on: jest.fn(),
		quit: jest.fn(),
	},
	BrowserWindow: jest.fn().mockImplementation(() => ({
		loadURL: jest.fn(),
		show: jest.fn(),
		close: jest.fn(),
	})),
}));
