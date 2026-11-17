import {
  LOADING_SQUAD_MESSAGE,
  MAX_SWAP_PLAYERS,
  NO_SWAP_PLAYERS_MESSAGE,
  SWAP_SQUAD_FAILED_MESSAGE,
} from '../constants'

import type { SwapAddState, SwapSquadState } from '../types'

/**
 * Works out whether the add button can add a swap player row, and why it cannot.
 *
 * - While the squad is being read, could not be read, or has no players, the button shows but
 *   cannot add, and says why.
 * - Once every player the form can still take has a row, no button shows.
 * - Otherwise the button can add a row and says nothing.
 *
 * @param squad The bidding club's squad and how far its read has come.
 * @param rowCount How many swap player rows there are.
 * @returns The state of the button, or `null` when no more rows can be added.
 */
export function toSwapAddState(squad: SwapSquadState, rowCount: number): SwapAddState | null {
  if (squad.status === 'loading') return { canAdd: false, hint: LOADING_SQUAD_MESSAGE }

  if (squad.status === 'failed') return { canAdd: false, hint: SWAP_SQUAD_FAILED_MESSAGE }

  if (squad.members.length === 0) return { canAdd: false, hint: NO_SWAP_PLAYERS_MESSAGE }

  if (rowCount >= Math.min(MAX_SWAP_PLAYERS, squad.members.length)) return null

  return { canAdd: true, hint: null }
}
