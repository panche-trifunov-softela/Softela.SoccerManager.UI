import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { RELOAD_STATUSES, SERVER_ERROR_STATUS } from '../constants'

import type { BoardSaveOptions, BoardSaveState, SaveMessages } from '../types'

/**
 * Sends the board's saves, the lineup's and the instructions' alike, one request at a time.
 *
 * - While a request is outstanding, for any match, or while the page's data is being read again,
 *   every control refuses input. A second request is never sent, and nothing on screen changes
 *   until the response arrives.
 * - Success shows nothing. A failure says why in a toast, and a 400, 403, 404 or 500 also reads
 *   the page's data again, since the server's state may have moved on. A 500, as when another
 *   device's save of the same thing won, is toasted as the caller's fixed sentence.
 *
 * @param options The match the board edits, whether its data is being read again, and what to
 * call to read it again.
 * @returns Whether the board is locked, whether a request is outstanding at this moment, and what
 * to send a request with.
 */
export function useBoardSave({ matchId, isReloading, reload }: BoardSaveOptions): BoardSaveState {
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

  const isLocked = hasPendingRequest || isReloading

  const isSending = useCallback(() => inFlight.current, [])

  const send = useCallback(
    <T>(call: () => Promise<T>, onDone: (result: T) => void, messages: SaveMessages) => {
      if (inFlight.current || matchId === null) return false

      inFlight.current = true

      setPendingMatchId(matchId)

      const settle = () => {
        inFlight.current = false

        if (!isMounted.current) return

        setPendingMatchId(null)
      }

      // Two handlers rather than a trailing catch, so a throw while swapping the result in can
      // never be reported as a failed save.
      const onSucceeded = (result: T) => {
        try {
          onDone(result)
        } finally {
          settle()
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

        settle()

        // The board's data, the match or the caller's access may have changed since the board was
        // read, or another device's save of the same thing won the race.
        if (status !== null && RELOAD_STATUSES.includes(status)) reload()
      }

      void call().then(onSucceeded, onFailed)

      return true
    },
    [matchId, reload],
  )

  return { isLocked, isSending, send }
}
