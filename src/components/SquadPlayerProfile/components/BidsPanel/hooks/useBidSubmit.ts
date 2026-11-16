import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { toFirstInvalidId } from '../utils'

import type { BidSubmitOptions, BidSubmitState } from '../types'

/**
 * Handles the submission of a bid form: checks it, then sends one bid at a time and says how it
 * went.
 *
 * - A submit while a bid is being sent does nothing.
 * - An invalid form shows its errors, then sends the focus to its first invalid control, which by
 *   then is marked invalid and described by its error.
 * - A bid that went through says so in a toast naming the player, then empties the form.
 * - A failed one says why in a toast naming the player, and the form keeps what was typed.
 * - A bid that settles after the form has gone still says how it went, and writes no state.
 *
 * @param options The player, the toasts' words, and what checks, sends and empties the form.
 * @returns Whether a bid is being sent, and the form's submit handler.
 */
export function useBidSubmit({
  playerName,
  sentMessage,
  failedMessage,
  validate,
  send,
  reset,
}: BidSubmitOptions): BidSubmitState {
  const [isPending, setIsPending] = useState(false)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const onSubmit: BidSubmitState['onSubmit'] = (event) => {
    event.preventDefault()

    if (isPending) return

    // The errors are on screen before the focus moves, so the control is announced with its error.
    const firstInvalidId = toFirstInvalidId(flushSync(validate))

    if (firstInvalidId !== null) {
      document.getElementById(firstInvalidId)?.focus()

      return
    }

    setIsPending(true)

    // Two handlers rather than a trailing catch, so a throw while emptying the form can never be
    // reported as a failed bid.
    const onPlaced = () => {
      toast.success(`${playerName}: ${sentMessage}`)

      if (!isMounted.current) return

      setIsPending(false)

      reset()
    }

    const onFailed = (cause: unknown) => {
      toast.error(`${playerName}: ${toErrorMessage(cause, failedMessage)}`)

      if (isMounted.current) setIsPending(false)
    }

    void send().then(onPlaced, onFailed)
  }

  return { isPending, onSubmit }
}
