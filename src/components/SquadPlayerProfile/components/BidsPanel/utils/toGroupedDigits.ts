import { GROUPED_NUMBER_FORMAT } from '../constants'

/**
 * Groups the digits of a number the way the reader's locale does.
 *
 * @param digits The digits to group, or an empty string.
 * @returns The digits with the locale's thousands separators, such as `18,000,000`; empty when no
 * digits are given.
 */
export function toGroupedDigits(digits: string): string {
  if (digits === '') return ''

  return GROUPED_NUMBER_FORMAT.format(Number(digits))
}
