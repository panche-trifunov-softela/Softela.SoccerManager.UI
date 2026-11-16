import type { BidFieldMessage } from '../types'

/**
 * Chooses the line to show under a field's control.
 *
 * @param error Why the field is not valid, or `null` when it is.
 * @param hint What guides the reader when the field is valid, or `null` for no guidance.
 * @returns The error when there is one, else the hint, else `null` for no line.
 */
export function toFieldMessage(error: string | null, hint: string | null): BidFieldMessage | null {
  if (error !== null) return { text: error, isError: true }

  if (hint !== null) return { text: hint, isError: false }

  return null
}
