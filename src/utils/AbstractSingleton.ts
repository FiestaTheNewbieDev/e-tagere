export default abstract class AbstractSingleton {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected static instances = new Map<any, AbstractSingleton>();

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected constructor() {}

	protected static _getInstance<T extends AbstractSingleton>(
		this: new () => T,
	): T {
		if (!AbstractSingleton.instances.has(this)) {
			AbstractSingleton.instances.set(this, new this());
		}
		return AbstractSingleton.instances.get(this) as T;
	}
}
