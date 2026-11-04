import { useCallback, useEffect, useRef, useState } from 'react'

import { autoPickMatchLineup, saveMatchLineup } from '@/services/api'

import {
  AUTO_PICK_FAILED_MESSAGE,
  CLEAR_SELECTION_KEY,
  LINEUP_REFRESH_MESSAGE,
  LINEUP_SAVE_FAILED_MESSAGE,
} from '../constants'
import { resolveTap, toLineupIndex } from '../utils'

import type { MatchLineupDto } from '@/types/matchLineupDto'

import type {
  LineupEditorOptions,
  LineupEditorState,
  LineupTap,
  MatchSelection,
  SlotChange,
} from '../types'

/**
 * Edits the lineup of the club's next match, one request per action. A tap changes one slot, and
 * the API does the move, the swap or the replacement in the same save.
 *
 * - The requests go through the board's shared save (`useBoardSave`), which sends one at a time,
 *   locks every control while one is outstanding or the page's data is read again, reports where
 *   the save stands, and reads the data again after a 400, 403, 404 or 500. The response replaces
 *   the shown lineup.
 * - Any request drops the selection. Tapping works in two steps: the first tap selects, the second
 *   moves, swaps, places or clears (see `resolveTap`). Escape drops the selection too.
 * - A selection belongs to one match, and reads as empty for any other.
 * - On a first visit, when the viewer runs the club and the lineup has a formation but nobody in
 *   it, the lineup is picked automatically. A match is judged once, the first time its lineup is
 *   seen while the board is unlocked, so emptying a lineup by hand never brings a pick.
 *
 * @param options The club, the match whose lineup is edited, the board's shared save, and what to
 * call to swap in a lineup the API returned.
 * @returns The selection and the actions.
 */
export function useLineupEditor({
  leagueTeamId,
  canAutoPickOnFirstVisit,
  nextMatch,
  save,
  replaceLineup,
}: LineupEditorOptions): LineupEditorState {
  const [selected, setSelected] = useState<MatchSelection | null>(null)

  const firstVisitChecked = useRef(new Set<number>())

  const { send: saveSend, isSending, isLocked } = save

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === CLEAR_SELECTION_KEY) setSelected(null)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const lineup = nextMatch?.lineup ?? null

  const matchId = lineup?.matchId ?? null

  const selection = selected !== null && selected.matchId === matchId ? selected.selection : null

  const send = useCallback(
    (call: () => Promise<MatchLineupDto>, failedMessage: string) => {
      const messages = { failedMessage, refreshMessage: LINEUP_REFRESH_MESSAGE }

      if (saveSend(call, replaceLineup, messages)) setSelected(null)
    },
    [saveSend, replaceLineup],
  )

  const autoPick = useCallback(() => {
    if (lineup === null || isLocked) return

    const { formationId } = lineup

    send(
      () =>
        autoPickMatchLineup({
          matchId: lineup.matchId,
          leagueTeamId: lineup.leagueTeamId,
          formationId,
        }),
      AUTO_PICK_FAILED_MESSAGE,
    )
  }, [lineup, isLocked, send])

  const isFirstVisitCheckable = canAutoPickOnFirstVisit && leagueTeamId !== null && lineup !== null

  const needsFirstPick =
    lineup !== null &&
    lineup.formationId !== null &&
    lineup.slots.every((slot) => slot.playerId === null)

  useEffect(() => {
    // While a request is outstanding or the data is read again, the match is not judged, so a pick
    // skipped for that reason happens when the board unlocks and this effect runs again.
    if (!isFirstVisitCheckable || matchId === null || isLocked || isSending()) return

    // A match is judged once, the first time its lineup is seen. A lineup that the manager empties
    // later is never picked for them, and a repeated effect run never sends a second pick.
    if (firstVisitChecked.current.has(matchId)) return

    firstVisitChecked.current.add(matchId)

    // The pick is a request to the API, which the effect starts once; dropping the selection with
    // it is the same as for any other request.
    // oxlint-disable-next-line react/set-state-in-effect
    if (needsFirstPick) autoPick()
  }, [isFirstVisitCheckable, matchId, isLocked, isSending, needsFirstPick, autoPick])

  const saveSlot = (current: MatchLineupDto, { slotNumber, playerId }: SlotChange) => {
    send(
      () =>
        saveMatchLineup({
          matchId: current.matchId,
          leagueTeamId: current.leagueTeamId,
          formationId: current.formationId,
          slotNumber,
          playerId,
        }),
      LINEUP_SAVE_FAILED_MESSAGE,
    )
  }

  const tap = (target: LineupTap) => {
    if (lineup === null || isLocked) return

    const { selection: next, change } = resolveTap(selection, target, lineup)

    if (change !== null) {
      saveSlot(lineup, change)

      return
    }

    setSelected(next === null ? null : { matchId: lineup.matchId, selection: next })
  }

  const tapSlot = (slotNumber: number) => {
    tap({ kind: 'slot', slotNumber })
  }

  const tapPlayer = (playerId: number) => {
    tap({ kind: 'player', playerId })
  }

  const removeSelected = () => {
    if (lineup === null || isLocked || selection?.kind !== 'slot') return

    const { slotNumber } = selection

    if (!toLineupIndex(lineup).playerBySlot.has(slotNumber)) return

    saveSlot(lineup, { slotNumber, playerId: null })
  }

  const clearSelection = () => {
    setSelected(null)
  }

  const changeFormation = (formationId: number) => {
    if (lineup === null || isLocked || formationId === lineup.formationId) return

    send(
      () =>
        saveMatchLineup({
          matchId: lineup.matchId,
          leagueTeamId: lineup.leagueTeamId,
          formationId,
        }),
      LINEUP_SAVE_FAILED_MESSAGE,
    )
  }

  return {
    selection,
    tapSlot,
    tapPlayer,
    removeSelected,
    clearSelection,
    changeFormation,
    autoPick,
  }
}
