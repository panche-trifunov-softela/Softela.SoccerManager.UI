import {
  FREE_AGENT_OPTION_LABEL,
  LABEL_SEPARATOR,
  NO_RATING_LABEL,
  RATING_LABEL_PREFIX,
} from '../constants'

import type { LeagueSearchPlayerItemDto } from '@/types/leagueSearchPlayerItemDto'

/**
 * Writes the one accessible name of a player's option.
 *
 * @param player The player the option stands for.
 * @returns The name, the full position name when there is one, the club or `free agent`, and the
 * rating or `no rating`, for example `Silva, Striker, Club B, rating 86`.
 */
export function toPlayerOptionLabel(player: LeagueSearchPlayerItemDto): string {
  const parts = [player.name]

  if (player.positionName !== '') parts.push(player.positionName)

  parts.push(player.teamName ?? FREE_AGENT_OPTION_LABEL)

  parts.push(player.rating === null ? NO_RATING_LABEL : `${RATING_LABEL_PREFIX}${player.rating}`)

  return parts.join(LABEL_SEPARATOR)
}
