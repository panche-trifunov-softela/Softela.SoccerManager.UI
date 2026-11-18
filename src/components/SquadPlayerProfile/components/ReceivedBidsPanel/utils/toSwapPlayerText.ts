import type { LeaguePlayerBidSwapPlayerDto } from '@/types/leaguePlayerBidSwapPlayerDto'

/**
 * Writes one player offered in swap.
 *
 * @param player The player as the API returns them.
 * @returns The name, then in brackets the position and the rating, each only when there is one,
 * such as `Silva (CB 78)` or `Costa (CM)`; the bare name when there is neither.
 */
export function toSwapPlayerText(player: LeaguePlayerBidSwapPlayerDto): string {
  const details = [
    player.positionShortName,
    player.rating === null ? '' : String(player.rating),
  ]
    .filter((part) => part !== '')
    .join(' ')

  return details === '' ? player.name : `${player.name} (${details})`
}
