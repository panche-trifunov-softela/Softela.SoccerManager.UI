import type { Toast } from '@/types/toast'
import type { ToastKind } from '@/types/toastKind'

/** The toast on screen, or `null` when there is none. */
let current: Toast | null = null

/** The id the next toast receives; it only ever grows. */
let nextId = 1

/** Everything to call when the current toast changes. */
const listeners = new Set<() => void>()

/**
 * Tells every subscriber the current toast changed.
 *
 * @returns Nothing.
 */
function emit(): void {
  listeners.forEach((listener) => listener())
}

/**
 * Makes a new toast the current one, replacing any toast already showing.
 *
 * @param kind The outcome the toast reports.
 * @param message The text to show.
 * @returns Nothing.
 */
function show(kind: ToastKind, message: string): void {
  current = { id: nextId++, kind, message }

  emit()
}

/**
 * The toast's subscription surface, shaped for `useSyncExternalStore`.
 */
export const toastStore = {
  /**
   * Registers a listener to call whenever the current toast changes.
   *
   * @param listener The function to call on a change.
   * @returns A function that removes the listener again.
   */
  subscribe(listener: () => void) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  },

  /**
   * Reads the current toast. The stored object itself is returned, never a
   * copy, so repeated reads between changes are identical.
   *
   * @returns The toast on screen, or `null` when there is none.
   */
  getSnapshot() {
    return current
  },
}

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
    if (current?.id !== id) return

    current = null

    emit()
  },
}
