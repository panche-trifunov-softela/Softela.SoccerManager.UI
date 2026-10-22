import type { ToastKind } from './toastKind'

/**
 * One notification, as the toast store holds it. Each toast carries its own
 * id so a signal can be told apart from a stale one.
 */
export interface Toast {
  /** Monotonically increasing; a newer toast always has a larger id. */
  id: number

  /** The outcome the toast reports. */
  kind: ToastKind

  /** The text shown to the user. */
  message: string
}
