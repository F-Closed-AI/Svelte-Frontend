export function areEqual<T>(_array: T[] | undefined, array: T[] | undefined) {
    if (_array === undefined || array === undefined) return false;
    return _array.every(x => array.includes(x)) && array.every(x => _array.includes(x));
}