import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { ToastKind } from '@/types/toastKind'

/**
 * How long each kind of toast stays on screen before it dismisses itself, in
 * milliseconds. An error stays longer because it has to be read and acted on.
 */
export const TOAST_DURATION_MS: Record<ToastKind, number> = {
  success: 6000,
  error: 10000,
}

/**
 * The visually hidden prefix read before a toast's message, so the outcome is
 * not conveyed by colour alone.
 */
export const TOAST_LABELS: Record<ToastKind, string> = {
  success: 'Success:',
  error: 'Error:',
}

/** The icon drawn beside each kind of toast. */
export const TOAST_ICONS: Record<ToastKind, IconDefinition> = {
  success: faCircleCheck,
  error: faCircleExclamation,
}

/** What the dismiss button announces. */
export const DISMISS_LABEL = 'Dismiss notification'
