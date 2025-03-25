
/**
 * Creates a copy of the given class instance, preserving its prototype chain.
 *
 * @template T - The type of the class instance.
 * @param {T} instance - The class instance to clone.
 * @returns {T} A new instance of the class with the same properties as the original.
 */
export function cloneClass<T>(instance:T):T {
  return Object.assign(Object.create(Object.getPrototypeOf(instance)), instance);
}