import { DeepWritable } from "../declarations/types/utils";

export default class ObjectHelper {
  public static isStrictObject(
    item: unknown
  ): item is Record<string | number | symbol, unknown> {
    return (
      item !== null &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      !(item instanceof Date) &&
      !(item instanceof RegExp) &&
      !(item instanceof Map) &&
      !(item instanceof Set) &&
      !(item instanceof WeakMap) &&
      !(item instanceof WeakSet) &&
      !(item instanceof Error) &&
      !(item instanceof Promise)
    );
  }
  public static deepCopyMap<K, V>(
    map: Map<K, V>
  ): Map<DeepWritable<K>, DeepWritable<V>> {
    const result = new Map<DeepWritable<K>, DeepWritable<V>>();
    for (const [k, v] of map)
      result.set(ObjectHelper.deepCopyObj(k), ObjectHelper.deepCopyObj(v));
    return result;
  }
  public static deepCopySet<T>(set: Set<T>): Set<DeepWritable<T>> {
    const result = new Set<DeepWritable<T>>();
    for (const item of set) result.add(ObjectHelper.deepCopyObj(item));
    return result;
  }
  public static deepCopyObj<T>(obj: T): DeepWritable<T> {
    if (typeof obj !== "object" || obj === null) return obj as DeepWritable<T>;
    if (obj instanceof Date) return new Date(obj.getTime()) as DeepWritable<T>;
    if (obj instanceof RegExp)
      return new RegExp(obj.source, obj.flags) as DeepWritable<T>;
    if (obj instanceof Map)
      return ObjectHelper.deepCopyMap(obj) as DeepWritable<T>;
    if (obj instanceof Set)
      return ObjectHelper.deepCopySet(obj) as DeepWritable<T>;
    if (Array.isArray(obj))
      return obj.map(item => ObjectHelper.deepCopyObj(item)) as DeepWritable<T>;
    if (ObjectHelper.isStrictObject(obj)) {
      const result: Record<string | number | symbol, unknown> = {};
      for (const key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
          result[key] = this.deepCopyObj(obj[key]);
      const symbols = Object.getOwnPropertySymbols(obj);
      for (const symbol of symbols)
        result[symbol] = this.deepCopyObj(obj[symbol as keyof typeof obj]);
      return result as DeepWritable<T>;
    }
    return obj as DeepWritable<T>;
  }
  public static deepCopyArrayLike<T>(
    arr: ArrayLike<T>
  ): Array<DeepWritable<T>> {
    const result: Array<DeepWritable<T>> = [];
    for (let i = 0; i < arr.length; i++) result[i] = this.deepCopyObj(arr[i]);
    return result;
  }
  public static isDeepCopy<T>(original: T, copy: T): boolean {
    if (original === copy) return false;
    if (typeof original !== typeof copy) return false;
    if (typeof original !== "object" || original === null)
      return original === copy;
    if (original instanceof Date && copy instanceof Date)
      return original.getTime() === copy.getTime();
    if (original instanceof RegExp && copy instanceof RegExp)
      return original.source === copy.source && original.flags === copy.flags;
    if (original instanceof Map && copy instanceof Map) {
      if (original.size !== copy.size) return false;
      for (const [key, value] of original)
        if (!copy.has(key) || !this.isDeepCopy(value, copy.get(key)))
          return false;
      return true;
    }
    if (Array.isArray(original) && Array.isArray(copy)) {
      if (original.length !== copy.length) return false;
      for (let i = 0; i < original.length; i++)
        if (!this.isDeepCopy(original[i], copy[i])) return false;
      return true;
    }
    if (this.isStrictObject(original) && this.isStrictObject(copy)) {
      const originalKeys = [
        ...Object.keys(original),
        ...Object.getOwnPropertySymbols(original),
      ];
      const copyKeys = [
        ...Object.keys(copy),
        ...Object.getOwnPropertySymbols(copy),
      ];
      if (originalKeys.length !== copyKeys.length) return false;
      for (const key of originalKeys) {
        if (!(key in copy)) return false;
        if (
          !this.isDeepCopy(
            (original as Record<string | symbol, unknown>)[key],
            (copy as Record<string | symbol, unknown>)[key]
          )
        )
          return false;
      }
      return true;
    }
    return false;
  }
  public static deepFreeze<T>(obj: T): Readonly<T> {
    if (typeof obj !== "object" || obj === null) return Object.freeze(obj);
    if (Array.isArray(obj)) {
      for (const item of obj) this.deepFreeze(item);
      return Object.freeze(obj);
    }
    if (obj instanceof Map) {
      for (const [k, v] of obj) {
        this.deepFreeze(k);
        this.deepFreeze(v);
      }
      return Object.freeze(obj);
    }
    if (obj instanceof Set) {
      for (const item of obj) this.deepFreeze(item);
      return Object.freeze(obj);
    }
    if (obj instanceof Date)
      return Object.freeze(new Date(obj.getTime())) as Readonly<T>;
    if (obj instanceof RegExp)
      return Object.freeze(new RegExp(obj.source, obj.flags)) as Readonly<T>;
    if (obj instanceof WeakMap || obj instanceof WeakSet)
      return Object.freeze(obj);
    if (this.isStrictObject(obj)) {
      for (const key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
          this.deepFreeze(obj[key]);
      const symbols = Object.getOwnPropertySymbols(obj);
      for (const symbol of symbols)
        this.deepFreeze(obj[symbol as keyof typeof obj]);
      return Object.freeze(obj);
    }
    return Object.freeze(obj);
  }
}
