/**
 * Writes a calendar date in the reader's locale.
 *
 * The date is built from its year, month and day parts as a local date. `new Date('1998-03-14')` is
 * parsed as UTC midnight, which is the previous day everywhere west of Greenwich; splitting the
 * parts avoids that.
 *
 * @param date The date, as `yyyy-MM-dd`.
 * @returns The date, such as `14 Mar 1998`.
 */
export function formatDateOnly(date: string): string {
  const [year, month, day] = date.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
