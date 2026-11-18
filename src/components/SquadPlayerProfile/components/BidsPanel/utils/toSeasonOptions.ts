import { toSeasonsText } from '@/components/SquadPlayerProfile/utils'

import type { BidSelectOption } from '../types'

/**
 * Writes the choices of a select of seasons.
 *
 * @param counts The numbers of seasons to offer, in order.
 * @returns One option per count, its value the count and its label the count in words.
 */
export function toSeasonOptions(counts: readonly number[]): BidSelectOption[] {
  return counts.map((count) => ({ value: String(count), label: toSeasonsText(count) }))
}
