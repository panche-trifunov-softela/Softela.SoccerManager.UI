import { toMessageId } from './toMessageId'

import type { BidFieldMessage, BidInputField, DigitsInputState } from '../types'

/**
 * Puts a numeric input's text, its line and its handlers together as a form's field.
 *
 * @param id The id of the input.
 * @param input The input's text and handlers.
 * @param message The line under the input, or `null` when there is none.
 * @param onEdit What to do once the reader changed the input, such as dropping its error; nothing
 * when omitted.
 * @returns The field, with typing running `onEdit` after the digits are kept.
 */
export function toInputField(
  id: string,
  input: DigitsInputState,
  message: BidFieldMessage | null,
  onEdit?: () => void,
): BidInputField {
  return {
    id,
    value: input.value,
    message,
    messageId: message === null ? null : toMessageId(id),
    isInvalid: message?.isError === true,
    onChange: (event) => {
      input.onChange(event)

      onEdit?.()
    },
    onFocus: input.onFocus,
    onBlur: input.onBlur,
  }
}
