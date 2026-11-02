/**
 * Writes the moment a match starts, in the reader's locale and time zone.
 *
 * @param startDateTime The start time, as an ISO 8601 UTC timestamp ending in `Z`.
 * @returns The weekday, day, month and time, such as `Sat, 14 Nov, 15:30`.
 */
export function formatKickOff(startDateTime: string): string {
  return new Date(startDateTime).toLocaleString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
