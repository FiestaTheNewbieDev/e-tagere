import AbstractSingleton from '@utils/AbstractSingleton';

class TestClassA extends AbstractSingleton {
	constructor() {
		super();
	}

	public static getInstance(): TestClassA {
		return super._getInstance<TestClassA>();
	}
}

class TestClassB extends AbstractSingleton {
	constructor() {
		super();
	}

	public static getInstance(): TestClassB {
		return super._getInstance<TestClassB>();
	}
}

describe('AbstractSingleton', () => {
	let classAInstance1: TestClassA;
	let classAInstance2: TestClassA;
	let classBInstance1: TestClassB;
	let classBInstance2: TestClassB;

	beforeEach(() => {
		classAInstance1 = TestClassA.getInstance();
		classAInstance2 = TestClassA.getInstance();
		classBInstance1 = TestClassB.getInstance();
		classBInstance2 = TestClassB.getInstance();
	});

	it('should return the same instance for TestClassA', () => {
		expect(classAInstance1).toBe(classAInstance2);
	});

	it('should return the same instance for TestClassB', () => {
		expect(classBInstance1).toBe(classBInstance2);
	});

	it('should return different instances for TestClassA and TestClassB', () => {
		expect(classAInstance1).not.toBe(classBInstance1);
		expect(classAInstance2).not.toBe(classBInstance2);
	});

	it('should return instances of correct types', () => {
		expect(classAInstance1).toBeInstanceOf(TestClassA);
		expect(classBInstance1).toBeInstanceOf(TestClassB);
	});

	it('should allow direct instantiation', () => {
		const directInstanceA = new TestClassA();
		const directInstanceB = new TestClassB();
		expect(directInstanceA).toBeInstanceOf(TestClassA);
		expect(directInstanceB).toBeInstanceOf(TestClassB);
	});
});
