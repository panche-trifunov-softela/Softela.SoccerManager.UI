import { PLAYER_OPTION_ID_SUFFIX, TEAM_OPTION_ID_SUFFIX } from '../constants'

import type { LeagueSearchOptionEntry } from '../types'

/**
 * Writes the id of one option of the list.
 *
 * @param listboxId The id of the list the option is in.
 * @param kind Whether the option stands for a player or a team.
 * @param id The player's id, or the team's league team id.
 * @returns An id that is unique to the list, the kind and the result.
 */
export function toOptionId(
  listboxId: string,
  kind: LeagueSearchOptionEntry['kind'],
  id: number,
): string {
  const suffix = kind === 'player' ? PLAYER_OPTION_ID_SUFFIX : TEAM_OPTION_ID_SUFFIX

  return `${listboxId}-${suffix}-${id}`
}
