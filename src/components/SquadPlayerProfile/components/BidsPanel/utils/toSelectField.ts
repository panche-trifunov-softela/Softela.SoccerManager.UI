import { toMessageId } from './toMessageId'

import type { BidFieldMessage, BidSelectField } from '../types'

/**
 * Puts a select's choice, its line and its handler together as a form's field.
 *
 * @param id The id of the select.
 * @param value The value of the chosen option.
 * @param message The line under the select, or `null` when there is none.
 * @param onChoose What to do with the value of the option the reader chose.
 * @param isDisabled Whether the select cannot be used for now; `false` when omitted.
 * @returns The field.
 */
export function toSelectField(
  id: string,
  value: string,
  message: BidFieldMessage | null,
  onChoose: (value: string) => void,
  isDisabled = false,
): BidSelectField {
  return {
    id,
    value,
    message,
    messageId: message === null ? null : toMessageId(id),
    isInvalid: message?.isError === true,
    isDisabled,
    onChange: (event) => {
      onChoose(event.target.value)
    },
  }
}
