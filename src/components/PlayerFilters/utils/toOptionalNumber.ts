/**
 * Turns a select's value into a filter value; the empty option means "no
 * filter".
 *
 * @param value The select's value, a number written out or an empty string.
 * @returns The number, or `undefined` for the empty option.
 */
export function toOptionalNumber(value: string): number | undefined {
  return value === '' ? undefined : Number(value)
}
