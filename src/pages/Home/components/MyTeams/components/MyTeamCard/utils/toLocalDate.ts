/**
 * Reads a date-only value from the API as a local calendar date.
 *
 * `new Date('2025-08-01')` is parsed as UTC midnight, which renders as the
 * previous day everywhere west of Greenwich. Splitting the parts avoids that.
 *
 * @param value The date, as `yyyy-MM-dd`.
 * @returns The same calendar day in the viewer's own timezone.
 */
export function toLocalDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}
