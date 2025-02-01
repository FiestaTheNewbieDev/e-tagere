import AbstractSingleton from '@utils/AbstractSingleton';

class TestClassA extends AbstractSingleton {
	public static getInstance(): TestClassA {
		return TestClassA._getInstance<TestClassA>();
	}

	public static setInstance(instance: TestClassA): void {
		TestClassA._setInstance<TestClassA>(instance);
	}

	public static clearInstance(): void {
		TestClassA._clearInstance<TestClassA>();
	}
}

class TestClassB extends AbstractSingleton {
	public static getInstance(): TestClassB {
		return TestClassB._getInstance<TestClassB>();
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

	it('should allow setting and getting the singleton instance', () => {
		const instance = new TestClassA();
		TestClassA.setInstance(instance);
		expect(TestClassA.getInstance()).toBe(instance);
	});

	it('should allow clearing the singleton instance', () => {
		const instance = new TestClassA();
		TestClassA.setInstance(instance);
		TestClassA.clearInstance();
		expect(TestClassA.getInstance()).not.toBe(instance);
	});

	it('should throw an error when trying to instantiate an abstract class', () => {
		expect(() => {
			new AbstractSingleton();
		}).toThrowError();
	});
});
