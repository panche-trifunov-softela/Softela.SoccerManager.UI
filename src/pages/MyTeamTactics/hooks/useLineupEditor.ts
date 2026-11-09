import { useCallback, useEffect, useRef, useState } from 'react'

import { autoPickMatchLineup, saveMatchLineup, saveMatchLineupSubstitution } from '@/services/api'

import {
  AUTO_PICK_FAILED_MESSAGE,
  CLEAR_SELECTION_KEY,
  LINEUP_REFRESH_MESSAGE,
  LINEUP_SAVE_FAILED_MESSAGE,
} from '../constants'
import { resolveTap, toLineupIndex } from '../utils'

import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { SaveMatchLineupRequest } from '@/types/saveMatchLineupRequest'

import type { LineupEditorOptions, LineupEditorState, LineupTap, MatchSelection } from '../types'

/**
 * Edits the lineup of the club's next match, one request per action. A tap changes one slot, and
 * the API does the move, the swap or the replacement in the same save.
 *
 * - The requests go through the board's shared save (`useBoardSave`), which sends one at a time,
 *   locks every control while one is outstanding or the page's data is read again, reports where
 *   the save stands, and reads the data again after a 400, 403, 404 or 500. The response replaces
 *   the shown lineup.
 * - While a substitution is open, the slot and formation changes go to its lineup instead of the
 *   main one, and the saved list the API returns replaces the shown one. Emptying a slot and auto
 *   pick, which only the main lineup has, do nothing, and neither does the first visit's pick.
 * - Any request drops the selection. Tapping works in two steps: the first tap selects, the second
 *   moves, swaps, places or clears (see `resolveTap`). Escape drops the selection too.
 * - A selection belongs to one match and one situation view, and reads as empty for any other: a
 *   substitution opened, switched or closed clears it.
 * - On a first visit, when the viewer runs the club and the lineup has a formation but nobody in
 *   it, the lineup is picked automatically. A match is judged once, the first time its lineup is
 *   seen while the board is unlocked, so emptying a lineup by hand never brings a pick.
 *
 * @param options The club, the match whose lineup is edited, the board's shared save, the open
 * substitution, and what to call to swap in a lineup or a saved list the API returned.
 * @returns The selection and the actions.
 */
export function useLineupEditor({
  leagueTeamId,
  canAutoPickOnFirstVisit,
  nextMatch,
  save,
  replaceLineup,
  situation,
  selectionEpoch,
  replaceSituations,
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

  const isSituationOpen = situation !== null

  const selection =
    selected !== null && selected.matchId === matchId && selected.epoch === selectionEpoch
      ? selected.selection
      : null

  const send = useCallback(
    (call: () => Promise<MatchLineupDto>, failedMessage: string) => {
      const messages = { failedMessage, refreshMessage: LINEUP_REFRESH_MESSAGE }

      if (saveSend(call, replaceLineup, messages)) setSelected(null)
    },
    [saveSend, replaceLineup],
  )

  const autoPick = useCallback(() => {
    // An auto pick only replaces the main lineup.
    if (lineup === null || isLocked || isSituationOpen) return

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
  }, [lineup, isLocked, isSituationOpen, send])

  const isFirstVisitCheckable = canAutoPickOnFirstVisit && leagueTeamId !== null && lineup !== null

  const needsFirstPick =
    lineup !== null &&
    lineup.formationId !== null &&
    lineup.slots.every((slot) => slot.playerId === null)

  useEffect(() => {
    // While a substitution is open the match is not judged either, so the visit is still judged
    // once the substitution closes.
    if (isSituationOpen) return

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
  }, [
    isSituationOpen,
    isFirstVisitCheckable,
    matchId,
    isLocked,
    isSending,
    needsFirstPick,
    autoPick,
  ])

  // Every slot and formation change goes to the lineup the board shows: the main one, or the open
  // situation's, whose answer is the whole list of saved situations.
  const saveLineup = (
    current: MatchLineupDto,
    change: Pick<SaveMatchLineupRequest, 'formationId' | 'slotNumber' | 'playerId'>,
  ) => {
    const { matchId: currentMatchId, leagueTeamId: currentLeagueTeamId } = current

    const messages = {
      failedMessage: LINEUP_SAVE_FAILED_MESSAGE,
      refreshMessage: LINEUP_REFRESH_MESSAGE,
    }

    const started =
      situation === null
        ? saveSend(
            () =>
              saveMatchLineup({
                matchId: currentMatchId,
                leagueTeamId: currentLeagueTeamId,
                ...change,
              }),
            replaceLineup,
            messages,
          )
        : saveSend(
            () =>
              saveMatchLineupSubstitution({
                matchId: currentMatchId,
                leagueTeamId: currentLeagueTeamId,
                minuteAt: situation.minuteAt,
                situation: situation.situation,
                ...change,
              }),
            (list) => {
              replaceSituations(currentMatchId, currentLeagueTeamId, list)
            },
            messages,
          )

    if (started) setSelected(null)
  }

  const tap = (target: LineupTap) => {
    if (lineup === null || isLocked) return

    const { selection: next, change } = resolveTap(selection, target, lineup)

    if (change !== null) {
      saveLineup(lineup, {
        formationId: lineup.formationId,
        slotNumber: change.slotNumber,
        playerId: change.playerId,
      })

      return
    }

    setSelected(
      next === null ? null : { matchId: lineup.matchId, epoch: selectionEpoch, selection: next },
    )
  }

  const tapSlot = (slotNumber: number) => {
    tap({ kind: 'slot', slotNumber })
  }

  const tapPlayer = (playerId: number) => {
    tap({ kind: 'player', playerId })
  }

  const removeSelected = () => {
    // A situation's slot is never emptied.
    if (lineup === null || isLocked || isSituationOpen || selection?.kind !== 'slot') return

    const { slotNumber } = selection

    if (!toLineupIndex(lineup).playerBySlot.has(slotNumber)) return

    saveLineup(lineup, { formationId: lineup.formationId, slotNumber, playerId: null })
  }

  const clearSelection = () => {
    setSelected(null)
  }

  const changeFormation = (formationId: number) => {
    if (lineup === null || isLocked || formationId === lineup.formationId) return

    saveLineup(lineup, { formationId })
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
