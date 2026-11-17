import {
  NO_GROUPS,
  PLAYERS_HEADING,
  PLAYERS_HEADING_ID_SUFFIX,
  TEAMS_HEADING,
  TEAMS_HEADING_ID_SUFFIX,
} from '../constants'

import { isGroupCut } from './isGroupCut'
import { toCutCountText } from './toCutCountText'
import { toOptionId } from './toOptionId'

import type { LeagueSearchResultDto } from '@/types/leagueSearchResultDto'

import type { LeagueSearchGroupView } from '../types'

/**
 * Lays what a search found out as the groups the popup draws.
 *
 * - The players come first, then the teams, and a group with no matches is left out.
 * - A group that holds only the best of its matches carries how many of how many it lists.
 * - Every option and heading gets an id that is unique across the groups.
 *
 * @param result What the search found, or `null` when there is nothing to list.
 * @param listboxId The id of the list the groups are in, which the other ids start from.
 * @returns The groups in the order the keys walk them.
 */
export function toSearchGroups(
  result: LeagueSearchResultDto | null,
  listboxId: string,
): readonly LeagueSearchGroupView[] {
  if (result === null) return NO_GROUPS

  const { players, teams } = result
  const groups: LeagueSearchGroupView[] = []

  if (players.items.length > 0) {
    groups.push({
      key: 'players',
      headingId: `${listboxId}-${PLAYERS_HEADING_ID_SUFFIX}`,
      heading: PLAYERS_HEADING,
      countText: isGroupCut(players)
        ? toCutCountText(players.items.length, players.totalCount)
        : null,
      options: players.items.map((player) => ({
        kind: 'player',
        id: toOptionId(listboxId, 'player', player.playerId),
        player,
      })),
    })
  }

  if (teams.items.length > 0) {
    groups.push({
      key: 'teams',
      headingId: `${listboxId}-${TEAMS_HEADING_ID_SUFFIX}`,
      heading: TEAMS_HEADING,
      countText: isGroupCut(teams) ? toCutCountText(teams.items.length, teams.totalCount) : null,
      options: teams.items.map((team) => ({
        kind: 'team',
        id: toOptionId(listboxId, 'team', team.leagueTeamId),
        team,
      })),
    })
  }

  return groups
}
