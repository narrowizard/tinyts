interface Array<T> {
    remove(index: number);
    remove(predicate: (elem: T) => boolean);
}