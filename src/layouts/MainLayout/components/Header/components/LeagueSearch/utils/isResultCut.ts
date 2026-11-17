import { isGroupCut } from './isGroupCut'

import type { LeagueSearchResultDto } from '@/types/leagueSearchResultDto'

/**
 * Tells whether a search found more than it lists.
 *
 * @param result What the search found.
 * @returns `true` when either group matched more than the best matches it holds.
 */
export function isResultCut(result: LeagueSearchResultDto): boolean {
  const { players, teams } = result

  return isGroupCut(players) || isGroupCut(teams)
}
