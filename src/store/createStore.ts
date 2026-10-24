import type { WritableStore } from '@/types/writableStore'

/**
 * Creates a store that holds one value outside React, shaped for `useSyncExternalStore`.
 *
 * - `getSnapshot` returns the stored value itself, so repeated reads between changes are
 *   identical.
 * - `set` replaces the value and notifies every listener.
 *
 * @template T The value the store holds.
 * @param initial The value the store starts with.
 * @returns The store: its subscription surface and the call that replaces the value.
 */
export function createStore<T>(initial: T): WritableStore<T> {
  let current = initial

  const listeners = new Set<() => void>()

  return {
    subscribe: (listener) => {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },

    getSnapshot: () => current,

    set: (next) => {
      current = next

      listeners.forEach((listener) => listener())
    },
  }
}
