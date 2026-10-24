/**
 * The read side of a store held outside React, shaped for `useSyncExternalStore`.
 *
 * @template T The value the store holds.
 */
export interface ReadableStore<T> {
  /**
   * Registers a listener to call whenever the value changes.
   *
   * @param listener The function to call on a change.
   * @returns A function that removes the listener again.
   */
  subscribe: (listener: () => void) => () => void

  /**
   * Reads the current value. The stored value itself is returned, never a copy, so repeated
   * reads between changes are identical.
   *
   * @returns The current value.
   */
  getSnapshot: () => T
}
