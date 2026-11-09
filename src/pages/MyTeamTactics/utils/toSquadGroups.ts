import {
  BENCH_SLOT_LABEL,
  CONDITION_DESCRIPTION,
  IN_LINEUP_DESCRIPTION,
  LAST_STARTER_SLOT,
  NO_RATING_DESCRIPTION,
  NUMBER_DESCRIPTION,
  RATING_DESCRIPTION,
  SUSPENDED_DESCRIPTION,
} from '../constants'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

import type { SquadRowView } from '../components/LineupSquadList'
import type { LineupIndex, LineupSelection, SlotView, SquadGroups } from '../types'

/**
 * Writes what a screen reader announces for a squad row.
 *
 * @param member The squad member, as the API returned them.
 * @param condition The member's condition as a percentage, for example `87%`.
 * @param lineupLabel The label of the slot the player is in, or `null` when they are not in the
 * lineup.
 * @returns The announcement, for example `Kevin De Bruyne, CM, number 17, rating 88, condition 87%,
 * in the lineup as CM, suspended`.
 */
function toRowAriaLabel(
  member: LeagueTeamSquadMemberDto,
  condition: string,
  lineupLabel: string | null,
): string {
  const parts = [
    member.name,
    member.positionShortName,
    `${NUMBER_DESCRIPTION} ${member.squadNumber}`,
    member.rating === null ? NO_RATING_DESCRIPTION : `${RATING_DESCRIPTION} ${member.rating}`,
    `${CONDITION_DESCRIPTION} ${condition}`,
  ]

  if (lineupLabel !== null) parts.push(`${IN_LINEUP_DESCRIPTION} ${lineupLabel}`)

  if (member.isSuspended) parts.push(SUSPENDED_DESCRIPTION)

  return parts.join(', ')
}

/**
 * Finds the player a selection points at.
 *
 * @param selection What is selected now, or `null` when nothing is.
 * @param index The lineup's players.
 * @returns The selected player, or the player in the selected slot, or `null` when there is none.
 */
function toSelectedPlayerId(selection: LineupSelection | null, index: LineupIndex): number | null {
  if (selection === null) return null

  if (selection.kind === 'player') return selection.playerId

  return index.playerBySlot.get(selection.slotNumber) ?? null
}

/**
 * Writes a squad member as a row of the list.
 *
 * @param member The squad member, as the API returned them.
 * @param lineupLabel The label of the slot the player is in, or `null` when they are not in the
 * lineup.
 * @param selectedPlayerId The selected player, or `null` when there is none.
 * @param isSelectable Whether the row can be picked.
 * @returns The row, with its texts already written.
 */
function toSquadRowView(
  member: LeagueTeamSquadMemberDto,
  lineupLabel: string | null,
  selectedPlayerId: number | null,
  isSelectable: boolean,
): SquadRowView {
  const condition = `${member.condition}%`

  return {
    playerId: member.playerId,
    squadNumber: member.squadNumber,
    name: member.name,
    positionShortName: member.positionShortName,
    positionName: member.positionName,
    rating: member.rating,
    condition,
    isSuspended: member.isSuspended,
    lineupLabel,
    isSelectable,
    isSelected: selectedPlayerId === member.playerId,
    ariaLabel: toRowAriaLabel(member, condition, lineupLabel),
  }
}

/**
 * Splits the squad by where each player stands in the lineup.
 *
 * - The starting eleven and the bench are listed by slot number, and everyone else in the squad's
 *   own order.
 * - A lineup player the squad does not list is left out.
 * - A suspended player outside the lineup cannot be picked; one already in the lineup still can,
 *   to be removed or replaced.
 * - While a situation is open only the lineup's players can be picked, and a suspended one on the
 *   bench not at all, because neither a player outside the lineup nor a suspended one can come on.
 *
 * @param squad The squad, as the API returned it.
 * @param index The lineup's players.
 * @param selection What is selected now, or `null` when nothing is.
 * @param slotViews The lineup's slots as the board draws them, which name each slot.
 * @param isSituationOpen Whether a situation is open.
 * @returns The three groups of rows.
 */
export function toSquadGroups(
  squad: readonly LeagueTeamSquadMemberDto[],
  index: LineupIndex,
  selection: LineupSelection | null,
  slotViews: readonly SlotView[],
  isSituationOpen: boolean,
): SquadGroups {
  const memberById = new Map<number, LeagueTeamSquadMemberDto>(
    squad.map((member) => [member.playerId, member]),
  )

  const labelBySlot = new Map<number, string>(
    slotViews.map((view) => [view.slotNumber, view.label]),
  )

  const selectedPlayerId = toSelectedPlayerId(selection, index)

  const starters: SquadRowView[] = []

  const bench: SquadRowView[] = []

  for (const [slotNumber, playerId] of [...index.playerBySlot].sort(([a], [b]) => a - b)) {
    const member = memberById.get(playerId)

    if (member === undefined) continue

    const label = labelBySlot.get(slotNumber) ?? BENCH_SLOT_LABEL

    const isStarter = slotNumber <= LAST_STARTER_SLOT

    // A lineup player can always be picked, except a suspended reserve while a situation is open.
    const isSelectable = !isSituationOpen || isStarter || !member.isSuspended

    const row = toSquadRowView(member, label, selectedPlayerId, isSelectable)

    if (isStarter) {
      starters.push(row)
    } else {
      bench.push(row)
    }
  }

  const notSelected = squad
    .filter((member) => !index.slotByPlayer.has(member.playerId))
    .map((member) =>
      toSquadRowView(member, null, selectedPlayerId, !isSituationOpen && !member.isSuspended),
    )

  return { starters, bench, notSelected }
}
