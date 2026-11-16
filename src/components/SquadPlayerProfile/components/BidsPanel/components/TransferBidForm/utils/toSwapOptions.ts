import { LOADING_SQUAD_OPTION, NO_SWAP_OPTION } from '../constants'

import type { BidSelectOption } from '@/components/SquadPlayerProfile/components/BidsPanel/types'

import type { SwapSquadState } from '../types'

/**
 * Writes the choices of one swap player field.
 *
 * @param squad The bidding club's squad and how far its read has come.
 * @param otherChoice The squad row id chosen in the other swap player field, or an empty string
 * for none, which this field leaves out so the two never match.
 * @returns Only a loading note while the squad is being read; else the choice of no swap player,
 * then each player of the squad but the other field's choice, as the name and the position, in the
 * squad's order.
 */
export function toSwapOptions(squad: SwapSquadState, otherChoice: string): BidSelectOption[] {
  if (squad.status === 'loading') return [{ value: '', label: LOADING_SQUAD_OPTION }]

  const players = squad.members
    .filter((member) => String(member.id) !== otherChoice)
    .map((member) => ({
      value: String(member.id),
      label: `${member.name} (${member.positionShortName})`,
    }))

  return [{ value: '', label: NO_SWAP_OPTION }, ...players]
}
