import { ageOn } from '@/utils/ageOn'
import { formatDateOnly } from '@/utils/formatDateOnly'

/**
 * Writes a player's date of birth with their age.
 *
 * @param dateOfBirth The date of birth, as `yyyy-MM-dd`.
 * @param today The day the age is counted to.
 * @returns The date and the age in brackets, such as `14 Mar 1998 (28)`.
 */
export function toBirthText(dateOfBirth: string, today: Date): string {
  return `${formatDateOnly(dateOfBirth)} (${ageOn(dateOfBirth, today)})`
}
