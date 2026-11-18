import { DOT_SEPARATOR } from '../constants'

/**
 * Writes a tab's label with the number of bids under it.
 *
 * @param label The tab's own words, such as `Transfer`.
 * @param count How many bids the tab lists.
 * @returns The label and the count, such as `Transfer · 2`; the plain label when there are none.
 */
export function toBidTabLabel(label: string, count: number): string {
  if (count === 0) return label

  return `${label}${DOT_SEPARATOR}${count}`
}
