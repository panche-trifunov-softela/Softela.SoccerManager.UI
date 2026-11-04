import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { RELOAD_STATUSES, SERVER_ERROR_STATUS } from '../constants'

import type { BoardSaveOptions, BoardSaveState, MatchSaveStatus, SaveMessages } from '../types'

/**
 * Sends the board's saves, the lineup's and the instructions' alike, one request at a time, and
 * says where they stand.
 *
 * - While a request is outstanding, for any match, or while the page's data is being read again,
 *   every control refuses input. A second request is never sent, and nothing on screen changes
 *   until the response arrives.
 * - A settled save state belongs to one match, and reads as idle for any other. The save state
 *   reads `saving` for as long as any request is outstanding.
 * - Success shows only in the save state. A failure says why in a toast, and a 400, 403, 404 or
 *   500 also reads the page's data again, since the server's state may have moved on. A 500, as
 *   when another device's save of the same thing won, is toasted as the caller's fixed sentence.
 *
 * @param options The match the board edits, whether its data is being read again, and what to
 * call to read it again.
 * @returns The save state, whether the board is locked, and what to send a request with.
 */
export function useBoardSave({ matchId, isReloading, reload }: BoardSaveOptions): BoardSaveState {
  const [outcome, setOutcome] = useState<MatchSaveStatus | null>(null)

  const [pendingMatchId, setPendingMatchId] = useState<number | null>(null)

  const inFlight = useRef(false)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const hasPendingRequest = pendingMatchId !== null

  const settledState = outcome !== null && outcome.matchId === matchId ? outcome.saveState : 'idle'

  const saveState = hasPendingRequest ? 'saving' : settledState

  const isLocked = hasPendingRequest || isReloading

  const isSending = useCallback(() => inFlight.current, [])

  const send = useCallback(
    <T>(call: () => Promise<T>, onDone: (result: T) => void, messages: SaveMessages) => {
      if (inFlight.current || matchId === null) return false

      inFlight.current = true

      setPendingMatchId(matchId)

      const settle = (saveState: MatchSaveStatus['saveState']) => {
        inFlight.current = false

        if (!isMounted.current) return

        setOutcome({ matchId, saveState })

        setPendingMatchId(null)
      }

      // Two handlers rather than a trailing catch, so a throw while swapping the result in can
      // never be reported as a failed save.
      const onSucceeded = (result: T) => {
        try {
          onDone(result)
        } finally {
          settle('saved')
        }
      }

      const onFailed = (cause: unknown) => {
        const status = cause instanceof ApiError ? cause.status : null

        // A 500 carries only a generic title, so a fixed sentence says what happens next.
        const message =
          status === SERVER_ERROR_STATUS
            ? messages.refreshMessage
            : toErrorMessage(cause, messages.failedMessage)

        toast.error(message)

        settle('failed')

        // The board's data, the match or the caller's access may have changed since the board was
        // read, or another device's save of the same thing won the race.
        if (status !== null && RELOAD_STATUSES.includes(status)) reload()
      }

      void call().then(onSucceeded, onFailed)

      return true
    },
    [matchId, reload],
  )

  return { saveState, isLocked, isSending, send }
}
