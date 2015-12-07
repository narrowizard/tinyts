interface Array<T> {
	where(predicate: (p: T) => boolean): Array<T>;

	first(predicate?: (p: T) => boolean): T;
}