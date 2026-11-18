import { useEffect, useRef, useState } from 'react'

import { ApiError, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import type { AnswerChoice } from '@/types/answerChoice'
import type { AnswerFlowOptions, AnswerFlowState, SentAnswer } from '@/types/answerFlow'

/**
 * Accepts and rejects the items of a list, one at a time.
 *
 * - While an answer is under way, every answer in the list refuses, so two competing items are
 *   never accepted together.
 * - An answer that went through keeps the list held back until the list, read again, leaves its
 *   item out. The backend decides which items remain, so the ones an acceptance rejected leave
 *   with it.
 * - Each outcome is put into words in a toast that starts with the item's prefix.
 * - A failed answer frees the list at once. A 400 or a 404 means the item was out of date, so the
 *   list is read again then too.
 * - A reply that lands after the list has gone writes no state.
 *
 * @template TItem One listed item.
 * @param options The items, how to key, send and word each answer, and what reads the list again.
 * @returns The answer under way, whether the list is held back, and the function that answers.
 */
export function useAnswerFlow<TItem>({
  items,
  toKey,
  send,
  toMessages,
  toToastPrefix,
  refresh,
}: AnswerFlowOptions<TItem>): AnswerFlowState<TItem> {
  const [sent, setSent] = useState<SentAnswer | null>(null)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const isListed = sent !== null && items.some((item) => toKey(item) === sent.key)

  // An answer holds the list back while it is in flight and, once it went through, until the list
  // read again leaves its item out.
  const sending = sent !== null && (!sent.hasGoneThrough || isListed) ? sent : null

  const answer = (item: TItem, choice: AnswerChoice) => {
    if (sending !== null) return

    const key = toKey(item)

    const prefix = toToastPrefix(item)

    const { answeredMessage, failedMessage } = toMessages(item, choice)

    setSent({ key, choice, hasGoneThrough: false })

    // Two handlers rather than a trailing catch, so a throw while reading again can never be
    // reported as a failed answer.
    const onAnswered = () => {
      toast.success(`${prefix}: ${answeredMessage}`)

      if (isMounted.current) setSent((current) => current && { ...current, hasGoneThrough: true })

      refresh()
    }

    const onFailed = (cause: unknown) => {
      toast.error(`${prefix}: ${toErrorMessage(cause, failedMessage)}`)

      if (isMounted.current) setSent(null)

      // A 400 or a 404 means the item was out of date: someone answered it first, it can no
      // longer be accepted, or it is gone.
      if (cause instanceof ApiError && [400, 404].includes(cause.status)) refresh()
    }

    void send(item, choice).then(onAnswered, onFailed)
  }

  return { sending, isLocked: sending !== null, answer }
}
