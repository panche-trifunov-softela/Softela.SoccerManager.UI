import {
  AND_JOINER,
  FOUND_SUFFIX,
  KEEP_TYPING_MESSAGE,
  PLAYER_NOUN,
  SHOWING_PREFIX,
  TEAM_NOUN,
} from '../constants'

import { isResultCut } from './isResultCut'
import { toFoundPart } from './toFoundPart'

import type { LeagueSearchResultDto } from '@/types/leagueSearchResultDto'

/**
 * Writes the sentence the live region announces for a search that found something.
 *
 * - A group with no matches is left out.
 * - When no group is cut the sentence counts what was found: `3 players and 1 team found.`
 * - When a group is cut it says how many are listed: `Showing 5 of 37 players and 2 teams.` and
 *   then asks for a longer term.
 *
 * @param result What the search found; at least one group has matches.
 * @returns The sentence to announce.
 */
export function toFoundMessage(result: LeagueSearchResultDto): string {
  const { players, teams } = result
  const parts: string[] = []

  if (players.items.length > 0) {
    parts.push(toFoundPart(players, PLAYER_NOUN))
  }

  if (teams.items.length > 0) {
    parts.push(toFoundPart(teams, TEAM_NOUN))
  }

  const counted = parts.join(AND_JOINER)

  return isResultCut(result)
    ? `${SHOWING_PREFIX}${counted}. ${KEEP_TYPING_MESSAGE}`
    : `${counted}${FOUND_SUFFIX}`
}
