/* eslint-disable @typescript-eslint/no-explicit-any */

export default abstract class AbstractSingleton {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected static instances = new Map<any, AbstractSingleton>();

	protected static _getInstance<T extends AbstractSingleton>(
		this: new (...args: any[]) => T,
		...args: any[]
	): T {
		if (!AbstractSingleton.instances.has(this)) {
			AbstractSingleton.instances.set(this, new this(args));
		}
		return AbstractSingleton.instances.get(this) as T;
	}
}
