import { createStore } from '@/store/createStore'

import type { ReadableStore } from '@/types/readableStore'
import type { Toast } from '@/types/toast'
import type { ToastKind } from '@/types/toastKind'

/** The toast on screen, or `null` when there is none. */
const store = createStore<Toast | null>(null)

/** The id the next toast receives; it only ever grows. */
let nextId = 1

/**
 * Makes a new toast the current one, replacing any toast already showing.
 *
 * @param kind The outcome the toast reports.
 * @param message The text to show.
 * @returns Nothing.
 */
function show(kind: ToastKind, message: string): void {
  store.set({ id: nextId++, kind, message })
}

/**
 * The toast's subscription surface, shaped for `useSyncExternalStore`.
 */
export const toastStore: ReadableStore<Toast | null> = store

/**
 * The calls that raise and clear toasts. They are plain functions that read no
 * React state. Only one toast shows at a time: a new one replaces the one
 * before it.
 */
export const toast = {
  /**
   * Shows a success toast.
   *
   * @param message The text to show.
   * @returns Nothing.
   */
  success(message: string): void {
    show('success', message)
  },

  /**
   * Shows an error toast.
   *
   * @param message The text to show.
   * @returns Nothing.
   */
  error(message: string): void {
    show('error', message)
  },

  /**
   * Clears the current toast, but only when it is the one with this id. A
   * timer or button belonging to a toast that was since replaced therefore
   * cannot close the newer one.
   *
   * @param id The id of the toast to clear.
   * @returns Nothing.
   */
  dismiss(id: number): void {
    if (store.getSnapshot()?.id !== id) return

    store.set(null)
  },
}
