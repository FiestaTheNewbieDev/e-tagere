global.localStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};

global.fetch = jest.fn(() =>
	Promise.resolve({ json: () => Promise.resolve({ data: 'fakeData' }) }),
);
