/**
 * Counts the years a person has completed on a day.
 *
 * The birth date is read as a local calendar date. `new Date('1990-05-17')` is
 * parsed as UTC midnight, which is the previous day everywhere west of
 * Greenwich; splitting the parts avoids that.
 *
 * @param dateOfBirth The birth date, as `yyyy-MM-dd`.
 * @param today The day to count to.
 * @returns The completed years, which is one less than the difference in
 * calendar years until the birthday has come round.
 */
export function ageOn(dateOfBirth: string, today: Date): number {
  const [year, month, day] = dateOfBirth.split('-').map(Number)

  const hadBirthday =
    today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day)

  return today.getFullYear() - year - (hadBirthday ? 0 : 1)
}
