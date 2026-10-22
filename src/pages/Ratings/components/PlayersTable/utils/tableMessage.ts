/**
 * Chooses what the table says in place of rows: loading, that the read failed,
 * a page past the end of the results, or no matches at all.
 *
 * @param rowCount How many rows there are to show.
 * @param totalCount How many players the query finds across all pages.
 * @param isLoading Whether a read is still in flight.
 * @param error The fixed sentence that says the last read failed, or `null` when it did not.
 * @returns The text to show, or `null` when there are rows to show instead.
 */
export function tableMessage(
  rowCount: number,
  totalCount: number,
  isLoading: boolean,
  error: string | null,
): string | null {
  if (rowCount > 0) return null

  if (isLoading) return 'Loading players…'

  if (error !== null) return error

  if (totalCount > 0) return 'This page is past the end of the results.'

  return 'No players match the search and filters.'
}
