/**
 * Writes the day a league was created, in the reader's locale.
 *
 * @param createdAt The creation time, as an ISO 8601 UTC timestamp.
 * @returns The local day, such as `9 Oct 2026`.
 */
export function formatCreatedAt(createdAt: string): string {
  return new Date(createdAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
