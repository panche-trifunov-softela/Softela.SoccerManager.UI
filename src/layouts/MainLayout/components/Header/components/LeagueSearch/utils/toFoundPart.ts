import { PLURAL_SUFFIX } from '../constants'

import { isGroupCut } from './isGroupCut'
import { toCutCountText } from './toCutCountText'

import type { LeagueSearchPlayerGroupDto } from '@/types/leagueSearchPlayerGroupDto'
import type { LeagueSearchTeamGroupDto } from '@/types/leagueSearchTeamGroupDto'

/**
 * Says how many of one kind of result there are, for the sentence that counts what was found.
 *
 * @param group The players or the teams a search found; it has matches.
 * @param noun The singular noun, for example `player`.
 * @returns For example `5 of 37 players` when the group is cut, otherwise `3 players` or `1 team`;
 * the noun is plural unless the group matched exactly one.
 */
export function toFoundPart(
  group: LeagueSearchPlayerGroupDto | LeagueSearchTeamGroupDto,
  noun: string,
): string {
  const { items, totalCount } = group
  const quantity = isGroupCut(group) ? toCutCountText(items.length, totalCount) : `${items.length}`

  return `${quantity} ${totalCount === 1 ? noun : `${noun}${PLURAL_SUFFIX}`}`
}
