import { SWAP_ARROW, SWAP_PLAYER_SEPARATOR } from '../constants'

import type { PlayerTransferDto } from '@/types/playerTransferDto'

/**
 * Writes who went where in a swap, for the line under a transfer's season.
 *
 * @param transfer The transfer as the API returns it.
 * @returns The player sold, an arrow, then the swapped players' names, for example
 * `Silva ⇄ Costa, Reis`; `null` when nobody was swapped.
 */
export function toSwapLine(transfer: PlayerTransferDto): string | null {
  if (transfer.swapPlayers.length === 0) return null

  const names = transfer.swapPlayers.map((player) => player.name).join(SWAP_PLAYER_SEPARATOR)

  return `${transfer.playerName} ${SWAP_ARROW} ${names}`
}
