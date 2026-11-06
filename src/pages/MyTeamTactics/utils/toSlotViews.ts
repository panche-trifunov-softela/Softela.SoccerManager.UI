import {
  BENCH_SLOT_LABEL,
  EMPTY_SLOT_DESCRIPTION,
  LAST_STARTER_SLOT,
  POSITION_FIT_LABELS,
  SUSPENDED_DESCRIPTION,
  UNKNOWN_PLAYER_NAME,
} from '../constants'

import { toMarkerName } from './toMarkerName'
import { toScreenPoint } from './toScreenPoint'
import { toSlotRooms } from './toSlotRooms'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { MatchLineupSlotDto } from '@/types/matchLineupSlotDto'
import type { PositionFit } from '@/types/positionFit'

import type { LineupSelection, ScreenPoint, SlotPlayerView, SlotView } from '../types'

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
 * Writes what a screen reader announces for a slot: its label, who is in it, how well they suit it,
 * and whether they are suspended.
 *
 * @param label The slot's label, with its bench place on a reserve slot.
 * @param player The player in the slot, or `null` when it is empty.
 * @param fit How well the player suits the slot, or `null` when the slot has no fit.
 * @returns The announcement, for example `CB, De Bruyne, poor fit` or `Sub 1, empty`.
 */
function toAriaLabel(
  label: string,
  player: SlotPlayerView | null,
  fit: PositionFit | null,
): string {
  if (player === null) return `${label}, ${EMPTY_SLOT_DESCRIPTION}`

  const fitDescription = fit === null ? '' : `, ${POSITION_FIT_LABELS[fit].toLowerCase()}`

  const suspension = player.isSuspended ? `, ${SUSPENDED_DESCRIPTION}` : ''

  return `${label}, ${player.markerName}${fitDescription}${suspension}`
}

/**
 * Works out where each placed slot sits on the board.
 *
 * @param slots The lineup's slots, as the API returned them.
 * @returns The board point of every starter slot that has both pitch coordinates, by slot number. A
 * reserve slot, or a starter slot with a missing coordinate, is not in it.
 */
function toSlotPoints(slots: readonly MatchLineupSlotDto[]): ReadonlyMap<number, ScreenPoint> {
  const points = new Map<number, ScreenPoint>()

  for (const { slotNumber, pitchX, pitchY } of slots) {
    if (slotNumber <= LAST_STARTER_SLOT && pitchX !== null && pitchY !== null) {
      points.set(slotNumber, toScreenPoint(pitchX, pitchY))
    }
  }

  return points
}

/**
 * Writes one slot of the lineup as the board draws it.
 *
 * @param slot The slot, as the API returned it.
 * @param squadById The squad by player id.
 * @param selection What is selected now, or `null` when nothing is.
 * @param points Where each placed slot sits on the board, by slot number.
 * @param rooms How wide each placed slot's marker may be, by slot number.
 * @returns The slot, with its place on the board, its player, its fit and its texts already
 * written.
 */
function toSlotView(
  slot: MatchLineupSlotDto,
  squadById: ReadonlyMap<number, LeagueTeamSquadMemberDto>,
  selection: LineupSelection | null,
  points: ReadonlyMap<number, ScreenPoint>,
  rooms: ReadonlyMap<number, number>,
): SlotView {
  const label = slot.positionShortName ?? BENCH_SLOT_LABEL

  const player = slot.playerId === null ? null : toSlotPlayer(slot.playerId, squadById)

  const point = points.get(slot.slotNumber)

  // An API older than this field sends no fit, which has to read as no colour, not break the page.
  const fit = slot.fit ?? null

  const isStarter = slot.slotNumber <= LAST_STARTER_SLOT

  // A reserve slot is announced with its place on the bench, so the eight are told apart.
  const announcedLabel = isStarter ? label : `${label} ${slot.slotNumber - LAST_STARTER_SLOT}`

  return {
    slotNumber: slot.slotNumber,
    label,
    positionName: slot.positionName,
    screenX: point?.x ?? null,
    screenY: point?.y ?? null,
    room: rooms.get(slot.slotNumber) ?? null,
    fit,
    player,
    isSelected: selection?.kind === 'slot' && selection.slotNumber === slot.slotNumber,
    ariaLabel: toAriaLabel(announcedLabel, player, fit),
  }
}

/**
 * Writes every slot of the lineup as the board draws it, in slot order.
 *
 * - A starter slot is placed on the board in perspective from its pitch coordinates, with the
 *   team's own goal line at the far end.
 * - A reserve slot, or a starter slot with a missing coordinate, has no place on the board.
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
  const points = toSlotPoints(lineup.slots)

  const rooms = toSlotRooms(points)

  return lineup.slots.map((slot) => toSlotView(slot, squadById, selection, points, rooms))
}
