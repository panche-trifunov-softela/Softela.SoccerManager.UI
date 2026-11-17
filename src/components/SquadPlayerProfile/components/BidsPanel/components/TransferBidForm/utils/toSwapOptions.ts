import { SWAP_PLACEHOLDER_OPTION } from '../constants'

import type { BidSelectOption } from '@/components/SquadPlayerProfile/components/BidsPanel/types'

import type { SwapSquadState } from '../types'

/**
 * Writes the choices of one swap player row.
 *
 * @param squad The bidding club's squad and how far its read has come.
 * @param otherChoices The squad row ids chosen in the other rows, which this row leaves out so no
 * two rows offer the same player. Its own choice stays in, so its value always has an option.
 * @returns The placeholder, which cannot be chosen, then each player of the squad but the other
 * rows' choices, as the name and the position, in the squad's order.
 */
export function toSwapOptions(
  squad: SwapSquadState,
  otherChoices: readonly string[],
): BidSelectOption[] {
  const players = squad.members
    .filter((member) => !otherChoices.includes(String(member.id)))
    .map((member) => ({
      value: String(member.id),
      label: `${member.name} (${member.positionShortName})`,
    }))

  return [{ value: '', label: SWAP_PLACEHOLDER_OPTION, isDisabled: true }, ...players]
}
