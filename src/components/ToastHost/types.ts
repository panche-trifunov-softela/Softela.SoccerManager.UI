import type { FocusEvent, KeyboardEvent, RefObject } from 'react'
import type { Toast } from '@/types/toast'

/**
 * Why the auto-dismiss timer is held back.
 *
 * - `hover`: the pointer is over the toast
 * - `focus`: focus is inside the toast
 * - `hidden`: the browser tab is hidden
 */
export type PauseReason = 'hover' | 'focus' | 'hidden'

/** What `useToastHost` hands the `ToastHost` view. */
export interface ToastHostState {
  /** The toast on screen, or `null` when there is none. */
  toast: Toast | null

  /** Attached to the toast element so the hook can inspect it in the DOM. */
  toastRef: RefObject<HTMLDivElement | null>

  /** Holds the timer while the pointer is over the toast. */
  onPointerEnter: () => void

  /** Lets the timer resume once the pointer has left the toast. */
  onPointerLeave: () => void

  /** Holds the timer while focus is inside the toast. */
  onFocus: (event: FocusEvent<HTMLDivElement>) => void

  /** Lets the timer resume once focus has left the toast. */
  onBlur: (event: FocusEvent<HTMLDivElement>) => void

  /** Closes the toast on `Escape`. */
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void

  /** Closes the toast; wired to the dismiss button. */
  onDismiss: () => void
}
