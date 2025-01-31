export default abstract class AbstractSingleton {
	protected static instance: AbstractSingleton;

	public static getInstance<T extends AbstractSingleton>(this: new () => T) {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance as T;
	}
}
