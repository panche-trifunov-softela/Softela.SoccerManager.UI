import type { ReadableStore } from './readableStore'

/**
 * A store held outside React, plus the one call that replaces its value.
 *
 * @template T The value the store holds.
 */
export interface WritableStore<T> extends ReadableStore<T> {
  /**
   * Replaces the value and notifies every listener. The store never copies or mutates what it
   * holds, so every change has to pass a new value.
   *
   * @param next The value to hold from now on.
   * @returns Nothing.
   */
  set: (next: T) => void
}
