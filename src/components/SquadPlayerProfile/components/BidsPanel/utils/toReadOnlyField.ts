import { toMessageId } from './toMessageId'

import type { BidFieldMessage, BidReadOnlyField } from '../types'

/**
 * Puts a value that cannot be edited and its line together as a form's field.
 *
 * @param id The id of the input.
 * @param value What the input shows.
 * @param message The line under the input, or `null` when there is none.
 * @returns The field.
 */
export function toReadOnlyField(
  id: string,
  value: string,
  message: BidFieldMessage | null,
): BidReadOnlyField {
  return { id, value, message, messageId: message === null ? null : toMessageId(id) }
}
