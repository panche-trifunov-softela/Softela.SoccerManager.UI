import { SWAP_LINE_LABEL, SWAP_PLAYER_SEPARATOR } from '../constants'

import { toSwapPlayerText } from './toSwapPlayerText'

import type { LeaguePlayerBidSwapPlayerDto } from '@/types/leaguePlayerBidSwapPlayerDto'

/**
 * Writes the players a transfer bid offers in swap.
 *
 * @param players The players as the API returns them.
 * @returns The line naming each, such as `Swap: Silva (CB 78), Costa (CM 74)`; `null` when none
 * is offered.
 */
export function toSwapPlayersText(players: readonly LeaguePlayerBidSwapPlayerDto[]): string | null {
  if (players.length === 0) return null

  return `${SWAP_LINE_LABEL}: ${players.map(toSwapPlayerText).join(SWAP_PLAYER_SEPARATOR)}`
}
