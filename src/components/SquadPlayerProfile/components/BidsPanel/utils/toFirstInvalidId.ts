import type { BidFieldError } from '../types'

/**
 * Finds the first field that is not valid.
 *
 * @param fields The form's fields, in the order they show.
 * @returns The id of the first field with an error, or `null` when every field is valid.
 */
export function toFirstInvalidId(fields: BidFieldError[]): string | null {
  return fields.find((field) => field.error !== null)?.id ?? null
}
