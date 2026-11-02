import {
  MOVE_HINT_SUFFIX,
  NO_SELECTION_HINT,
  PICK_HINT_PREFIX,
  PICK_HINT_SUFFIX,
  PLACE_HINT_SUFFIX,
  UNKNOWN_PLAYER_NAME,
} from '../constants'

import { toMarkerName } from './toMarkerName'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

import type { LineupIndex, LineupSelection, SlotView } from '../types'

/**
 * Says what the next tap does, given what is selected.
 *
 * - A filled slot asks for a slot to move the player to, or a player to swap in.
 * - An empty slot asks for a player to fill it.
 * - A player outside the lineup asks for a slot to place them in.
 * - Nothing selected, or a selection that points at nothing the board knows, invites a first tap.
 *
 * @param selection What is selected now, or `null` when nothing is.
 * @param index The lineup's players.
 * @param squadById The squad by player id.
 * @param slotViews The lineup's slots as the board draws them.
 * @returns The sentence to show.
 */
export function toSelectionHint(
  selection: LineupSelection | null,
  index: LineupIndex,
  squadById: ReadonlyMap<number, LeagueTeamSquadMemberDto>,
  slotViews: readonly SlotView[],
): string {
  if (selection === null) return NO_SELECTION_HINT

  if (selection.kind === 'player') {
    const member = squadById.get(selection.playerId)

    return member === undefined
      ? NO_SELECTION_HINT
      : `${toMarkerName(member.name)}${PLACE_HINT_SUFFIX}`
  }

  const slot = slotViews.find((view) => view.slotNumber === selection.slotNumber)

  if (slot === undefined) return NO_SELECTION_HINT

  if (!index.playerBySlot.has(selection.slotNumber)) {
    return `${PICK_HINT_PREFIX}${slot.label}${PICK_HINT_SUFFIX}`
  }

  const name = slot.player?.markerName ?? UNKNOWN_PLAYER_NAME

  return `${name}${MOVE_HINT_SUFFIX}`
}
