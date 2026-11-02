import {
  BENCH_SLOT_LABEL,
  EMPTY_SLOT_DESCRIPTION,
  LAST_STARTER_SLOT,
  SUSPENDED_DESCRIPTION,
  UNKNOWN_PLAYER_NAME,
} from '../constants'

import { toMarkerName } from './toMarkerName'
import { toScreenX } from './toScreenX'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { MatchLineupSlotDto } from '@/types/matchLineupSlotDto'

import type { LineupSelection, SlotPlayerView, SlotView } from '../types'

/**
 * Joins the player in a slot to the squad.
 *
 * @param playerId The id of the player in the slot.
 * @param squadById The squad by player id.
 * @returns The player as the slot shows them. A player the squad does not list is named as
 * unknown, with no photo or rating, and is not suspended.
 */
function toSlotPlayer(
  playerId: number,
  squadById: ReadonlyMap<number, LeagueTeamSquadMemberDto>,
): SlotPlayerView {
  const member = squadById.get(playerId)

  if (member === undefined) {
    return {
      playerId,
      name: UNKNOWN_PLAYER_NAME,
      markerName: UNKNOWN_PLAYER_NAME,
      imageUrl: null,
      rating: null,
      isSuspended: false,
    }
  }

  return {
    playerId,
    name: member.name,
    markerName: toMarkerName(member.name),
    imageUrl: member.imageUrl,
    rating: member.rating,
    isSuspended: member.isSuspended,
  }
}

/**
 * Writes what a screen reader announces for a slot: its label, who is in it, and whether they are
 * suspended.
 *
 * @param label The slot's label, with its bench place on a reserve slot.
 * @param player The player in the slot, or `null` when it is empty.
 * @returns The announcement, for example `CB, De Bruyne` or `Sub 1, empty`.
 */
function toAriaLabel(label: string, player: SlotPlayerView | null): string {
  if (player === null) return `${label}, ${EMPTY_SLOT_DESCRIPTION}`

  const suspension = player.isSuspended ? `, ${SUSPENDED_DESCRIPTION}` : ''

  return `${label}, ${player.markerName}${suspension}`
}

/**
 * Writes one slot of the lineup as the board draws it.
 *
 * @param slot The slot, as the API returned it.
 * @param squadById The squad by player id.
 * @param selection What is selected now, or `null` when nothing is.
 * @returns The slot, with its place on the screen, its player and its texts already written.
 */
function toSlotView(
  slot: MatchLineupSlotDto,
  squadById: ReadonlyMap<number, LeagueTeamSquadMemberDto>,
  selection: LineupSelection | null,
): SlotView {
  const label = slot.positionShortName ?? BENCH_SLOT_LABEL

  const player = slot.playerId === null ? null : toSlotPlayer(slot.playerId, squadById)

  const { pitchX, pitchY } = slot

  const isStarter = slot.slotNumber <= LAST_STARTER_SLOT

  const isPlaced = isStarter && pitchX !== null && pitchY !== null

  // A reserve slot is announced with its place on the bench, so the eight are told apart.
  const announcedLabel = isStarter ? label : `${label} ${slot.slotNumber - LAST_STARTER_SLOT}`

  return {
    slotNumber: slot.slotNumber,
    label,
    positionName: slot.positionName,
    screenX: isPlaced ? toScreenX(pitchX) : null,
    screenY: isPlaced ? pitchY : null,
    player,
    isSelected: selection?.kind === 'slot' && selection.slotNumber === slot.slotNumber,
    ariaLabel: toAriaLabel(announcedLabel, player),
  }
}

/**
 * Writes every slot of the lineup as the board draws it, in slot order.
 *
 * - A starter slot is placed on the screen from its pitch coordinates, the pitch's top being the
 *   team's own goal line.
 * - A reserve slot, or a starter slot with a missing coordinate, has no place on the screen.
 * - A player the squad does not list is shown as an unknown player.
 *
 * @param lineup The lineup, as the API returned it.
 * @param squadById The squad by player id.
 * @param selection What is selected now, or `null` when nothing is.
 * @returns One view per slot.
 */
export function toSlotViews(
  lineup: MatchLineupDto,
  squadById: ReadonlyMap<number, LeagueTeamSquadMemberDto>,
  selection: LineupSelection | null,
): SlotView[] {
  return lineup.slots.map((slot) => toSlotView(slot, squadById, selection))
}
