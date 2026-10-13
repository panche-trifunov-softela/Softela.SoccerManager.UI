/**
 * Writes where the reader is in the results.
 *
 * @param page The page shown, counting from 1.
 * @param totalPages How many pages the matches fill.
 * @param totalCount How many players match in all.
 * @returns The summary in the reader's locale, such as `Page 2 of 272 · 6,781 players`.
 */
export function pagerSummary(page: number, totalPages: number, totalCount: number): string {
  const count = new Intl.NumberFormat().format(totalCount)

  return `Page ${page} of ${totalPages} · ${count} ${totalCount === 1 ? 'player' : 'players'}`
}
