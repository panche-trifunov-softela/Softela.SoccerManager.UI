import { formatDateOnly } from '@/utils/formatDateOnly'

/** How many characters of an ISO date-time make up its day, `yyyy-MM-dd`. */
const DAY_LENGTH = 10

/**
 * Writes the dates of an injury.
 *
 * The API sends UTC ISO strings, so the first ten characters of each are its UTC calendar day. That
 * day goes to `formatDateOnly` as it is, not converted to the reader's time zone: shown this way, a
 * date entered as midnight UTC is the same day in every time zone.
 *
 * @param injuryStartDate When the injury began, as an ISO date-time in UTC.
 * @param injuryEndDate When the player is, or was, fit again, as an ISO date-time in UTC.
 * @returns The two days joined by a spaced en dash.
 */
export function toInjuryDates(injuryStartDate: string, injuryEndDate: string): string {
  const start = formatDateOnly(injuryStartDate.slice(0, DAY_LENGTH))

  const end = formatDateOnly(injuryEndDate.slice(0, DAY_LENGTH))

  return `${start} – ${end}`
}
