import { toLineupIndex } from './toLineupIndex'

import type { MatchLineupDto } from '@/types/matchLineupDto'

import type { LineupIndex, LineupSelection, LineupTap, TapOutcome } from '../types'

/**
 * Works out what tapping one slot does while another slot is selected.
 *
 * - The same slot again clears the selection.
 * - A filled slot and any other slot put the first slot's player in the second, so the API moves
 *   the player into an empty slot or swaps the two players.
 * - An empty slot and a filled one put the filled slot's player in the empty one.
 * - Two empty slots move the selection to the second.
 *
 * @param from The number of the selected slot.
 * @param to The number of the slot that was tapped.
 * @param index The lineup's players.
 * @returns The new selection, or the change to send.
 */
function resolveSlotToSlot(from: number, to: number, index: LineupIndex): TapOutcome {
  if (from === to) return { selection: null, change: null }

  const fromPlayer = index.playerBySlot.get(from) ?? null

  const toPlayer = index.playerBySlot.get(to) ?? null

  if (fromPlayer !== null) {
    return { selection: null, change: { slotNumber: to, playerId: fromPlayer } }
  }

  if (toPlayer !== null) {
    return { selection: null, change: { slotNumber: from, playerId: toPlayer } }
  }

  return { selection: { kind: 'slot', slotNumber: to }, change: null }
}

/**
 * Works out what a tap on the board does, given what is already selected.
 *
 * A tap on a player who is in the lineup counts as a tap on that player's slot. After that:
 *
 * - With nothing selected, the tapped slot or player becomes the selection.
 * - With a slot selected, a second slot moves, swaps or reselects (see `resolveSlotToSlot`), and a
 *   player who is not in the lineup is put in the selected slot.
 * - With a player selected, a slot receives that player, the same player again clears the
 *   selection, and another player who is not in the lineup becomes the selection.
 *
 * Every change is one "put the player in the slot" request: the API does the move, the swap or
 * the replacement. A change always comes with an empty selection.
 *
 * @param selection What is selected now, or `null` when nothing is.
 * @param tap What was tapped.
 * @param lineup The lineup shown.
 * @returns The selection after the tap and the change to send, if any.
 */
export function resolveTap(
  selection: LineupSelection | null,
  tap: LineupTap,
  lineup: MatchLineupDto,
): TapOutcome {
  const index = toLineupIndex(lineup)

  const lineupSlot = tap.kind === 'player' ? index.slotByPlayer.get(tap.playerId) : undefined

  const target: LineupTap =
    lineupSlot === undefined ? tap : { kind: 'slot', slotNumber: lineupSlot }

  if (selection === null) return { selection: target, change: null }

  if (selection.kind === 'slot') {
    if (target.kind === 'player') {
      return {
        selection: null,
        change: { slotNumber: selection.slotNumber, playerId: target.playerId },
      }
    }

    return resolveSlotToSlot(selection.slotNumber, target.slotNumber, index)
  }

  if (target.kind === 'slot') {
    return {
      selection: null,
      change: { slotNumber: target.slotNumber, playerId: selection.playerId },
    }
  }

  if (target.playerId === selection.playerId) return { selection: null, change: null }

  return { selection: target, change: null }
}
