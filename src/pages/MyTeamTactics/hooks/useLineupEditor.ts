import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, autoPickMatchLineup, saveMatchLineup, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import {
  AUTO_PICK_FAILED_MESSAGE,
  CLEAR_SELECTION_KEY,
  LINEUP_REFRESH_MESSAGE,
  LINEUP_SAVE_FAILED_MESSAGE,
  RELOAD_STATUSES,
  SERVER_ERROR_STATUS,
} from '../constants'
import { resolveTap, toLineupIndex } from '../utils'

import type { MatchLineupDto } from '@/types/matchLineupDto'

import type {
  LineupEditorOptions,
  LineupEditorState,
  LineupTap,
  MatchSaveStatus,
  MatchSelection,
  SlotChange,
} from '../types'

/**
 * Edits the lineup of the club's next match, one request per action. A tap changes one slot, and
 * the API does the move, the swap or the replacement in the same save.
 *
 * - While a request is outstanding, for any match, or while the page's data is being read again,
 *   every control refuses input. A second request is never sent, and nothing on screen changes
 *   until the response arrives. The response replaces the shown lineup.
 * - Any request drops the selection. Tapping works in two steps: the first tap selects, the second
 *   moves, swaps, places or clears (see `resolveTap`). Escape drops the selection too.
 * - A selection and a settled save state belong to one match, and read as empty for any other.
 *   The save state reads `saving` for as long as any request is outstanding.
 * - Success shows only in the save state. A failure says why in a toast, and a 400, 403, 404 or
 *   500 also reads the page's data again, since the server's state may have moved on. A 500, as
 *   when another device's save of the same lineup won, is toasted as a fixed sentence.
 * - On a first visit, when the viewer runs the club and the lineup has a formation but nobody in
 *   it, the lineup is picked automatically. A match is judged once, the first time its lineup is
 *   seen while the board is unlocked, so emptying a lineup by hand never brings a pick.
 *
 * @param options The club, the match whose lineup is edited, and what to call to refresh it.
 * @returns The selection, the save state, whether the board is locked, and the actions.
 */
export function useLineupEditor({
  leagueTeamId,
  canAutoPickOnFirstVisit,
  nextMatch,
  isReloading,
  reload,
  replaceLineup,
}: LineupEditorOptions): LineupEditorState {
  const [selected, setSelected] = useState<MatchSelection | null>(null)

  const [outcome, setOutcome] = useState<MatchSaveStatus | null>(null)

  const [pendingMatchId, setPendingMatchId] = useState<number | null>(null)

  const inFlight = useRef(false)

  const isMounted = useRef(false)

  const firstVisitChecked = useRef(new Set<number>())

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

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

  const hasPendingRequest = pendingMatchId !== null

  const settledState = outcome !== null && outcome.matchId === matchId ? outcome.saveState : 'idle'

  const saveState = hasPendingRequest ? 'saving' : settledState

  const isLocked = hasPendingRequest || isReloading

  const send = useCallback(
    (call: () => Promise<MatchLineupDto>, failedMessage: string) => {
      if (inFlight.current || matchId === null) return

      inFlight.current = true

      setSelected(null)

      setPendingMatchId(matchId)

      const settle = (saveState: MatchSaveStatus['saveState']) => {
        inFlight.current = false

        if (!isMounted.current) return

        setOutcome({ matchId, saveState })

        setPendingMatchId(null)
      }

      // Two handlers rather than a trailing catch, so a throw while swapping the lineup in can
      // never be reported as a failed save.
      const onDone = (result: MatchLineupDto) => {
        try {
          replaceLineup(result)
        } finally {
          settle('saved')
        }
      }

      const onFailed = (cause: unknown) => {
        const status = cause instanceof ApiError ? cause.status : null

        // A 500 carries only a generic title, so a fixed sentence says what happens next.
        const message =
          status === SERVER_ERROR_STATUS
            ? LINEUP_REFRESH_MESSAGE
            : toErrorMessage(cause, failedMessage)

        toast.error(message)

        settle('failed')

        // The lineup, the match or the caller's access may have changed since the board was read,
        // or another device's save of the same lineup won the race.
        if (status !== null && RELOAD_STATUSES.includes(status)) reload()
      }

      void call().then(onDone, onFailed)
    },
    [matchId, replaceLineup, reload],
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
    if (!isFirstVisitCheckable || matchId === null || isLocked || inFlight.current) return

    // A match is judged once, the first time its lineup is seen. A lineup that the manager empties
    // later is never picked for them, and a repeated effect run never sends a second pick.
    if (firstVisitChecked.current.has(matchId)) return

    firstVisitChecked.current.add(matchId)

    if (needsFirstPick) autoPick()
  }, [isFirstVisitCheckable, matchId, isLocked, needsFirstPick, autoPick])

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
    saveState,
    isLocked,
    tapSlot,
    tapPlayer,
    removeSelected,
    clearSelection,
    changeFormation,
    autoPick,
  }
}
