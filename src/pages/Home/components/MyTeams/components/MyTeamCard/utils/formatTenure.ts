import { toLocalDate } from './toLocalDate'

/** How each end of a tenure is written. */
const MONTH_AND_YEAR: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }

/**
 * Writes the span an appointment covers.
 *
 * @param startDate The date the tenure started, as `yyyy-MM-dd`.
 * @param endDate The date it ended, or `null` while it is still current.
 * @returns The span, such as `Since Aug 2025` or `Aug 2023 – Jun 2025`.
 */
export function formatTenure(startDate: string, endDate: string | null): string {
  const start = toLocalDate(startDate).toLocaleDateString(undefined, MONTH_AND_YEAR)

  if (endDate === null) return `Since ${start}`

  return `${start} – ${toLocalDate(endDate).toLocaleDateString(undefined, MONTH_AND_YEAR)}`
}
