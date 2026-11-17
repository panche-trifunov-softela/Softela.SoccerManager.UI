import type { LeagueSearchPlayerGroupDto } from '@/types/leagueSearchPlayerGroupDto'
import type { LeagueSearchTeamGroupDto } from '@/types/leagueSearchTeamGroupDto'

/**
 * Tells whether a group matched more than it lists.
 *
 * @param group The players or the teams a search found.
 * @returns `true` when the group matched more than the best matches it holds.
 */
export function isGroupCut(group: LeagueSearchPlayerGroupDto | LeagueSearchTeamGroupDto): boolean {
  return group.totalCount > group.items.length
}
