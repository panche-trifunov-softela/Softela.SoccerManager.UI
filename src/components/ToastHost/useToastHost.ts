import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

import { toast, toastStore } from '@/store/toast'

import { TOAST_DURATION_MS } from './constants'

import type { FocusEvent, KeyboardEvent } from 'react'
import type { PauseReason, ToastHostState } from './types'

/**
 * Reads the current toast from the store and owns its auto-dismiss timer, its
 * pause rules and its focus handling.
 *
 * Flow for each toast:
 * 1. The timer starts with the full duration for the toast's kind.
 * 2. It is held while the pointer is over the toast, while focus is inside it
 *    and while the browser tab is hidden, and resumes with the time left.
 * 3. When it elapses, or the dismiss button is used, or `Escape` is pressed
 *    anywhere in the page, the store clears the toast.
 * 4. A dismissal made from inside the toast returns focus to the element that
 *    had it before, when that element is still in the page.
 *
 * @returns The current toast, the toast element's ref and the event handlers.
 */
export function useToastHost(): ToastHostState {
  const current = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot)

  const toastRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | undefined>(undefined)
  const remainingRef = useRef(0)
  const startedAtRef = useRef(0)
  const reasonsRef = useRef(new Set<PauseReason>())
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const stopTimer = useCallback(() => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }, [])

  const startTimer = useCallback(
    (id: number) => {
      stopTimer()

      startedAtRef.current = performance.now()
      timeoutRef.current = window.setTimeout(() => toast.dismiss(id), remainingRef.current)
    },
    [stopTimer],
  )

  const pause = useCallback(
    (reason: PauseReason) => {
      const reasons = reasonsRef.current

      // Only the first reason stops the clock; the time already spent is
      // taken off so the next run continues where this one stopped.
      if (reasons.size === 0 && timeoutRef.current !== undefined) {
        stopTimer()

        remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAtRef.current))
      }

      reasons.add(reason)
    },
    [stopTimer],
  )

  const resume = useCallback(
    (reason: PauseReason) => {
      const reasons = reasonsRef.current

      if (!reasons.delete(reason)) return

      const showing = toastStore.getSnapshot()

      if (reasons.size === 0 && showing) startTimer(showing.id)
    },
    [startTimer],
  )

  // Declared before the toast effect so a tab that is already hidden holds the
  // timer before the toast effect decides whether to start it.
  useEffect(() => {
    const reasons = reasonsRef.current

    const syncVisibility = () => {
      if (document.hidden) pause('hidden')
      else resume('hidden')
    }

    syncVisibility()

    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)

      reasons.delete('hidden')
    }
  }, [pause, resume])

  useEffect(() => {
    if (!current) return

    const element = toastRef.current
    const reasons = reasonsRef.current

    remainingRef.current = TOAST_DURATION_MS[current.kind]

    // The replaced element left the page without pointerleave or blur, so
    // those two reasons are read again from the new element. A hidden tab
    // keeps its reason.
    reasons.delete('hover')
    reasons.delete('focus')

    if (element?.matches(':hover')) reasons.add('hover')
    if (element?.contains(document.activeElement)) reasons.add('focus')

    if (reasons.size === 0) startTimer(current.id)

    return () => {
      stopTimer()

      // The element focus came from belongs to this toast, never to the next one.
      returnFocusRef.current = null
    }
  }, [current, startTimer, stopTimer])

  const currentId = current?.id

  useEffect(() => {
    if (currentId === undefined) return

    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') toast.dismiss(currentId)
    }

    // Focus is usually on the page, not in the toast, so Escape is also
    // heard on the document. It does not stop the key: the header drawer
    // closes on the same press.
    document.addEventListener('keydown', onDocumentKeyDown)

    return () => document.removeEventListener('keydown', onDocumentKeyDown)
  }, [currentId])

  const onPointerEnter = useCallback(() => pause('hover'), [pause])

  const onPointerLeave = useCallback(() => resume('hover'), [resume])

  const onFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const from = event.relatedTarget

      // Focus arriving from another element in the page is the place to return
      // to on dismissal. Focus moving inside the toast, or coming back with the
      // window (no related target), keeps the element already remembered.
      if (from instanceof HTMLElement && !event.currentTarget.contains(from)) {
        returnFocusRef.current = from
      }

      pause('focus')
    },
    [pause],
  )

  const onBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const to = event.relatedTarget

      if (to instanceof Node && event.currentTarget.contains(to)) return

      resume('focus')
    },
    [resume],
  )

  const onDismiss = useCallback(() => {
    if (!current) return

    const hadFocus = toastRef.current?.contains(document.activeElement) ?? false
    const returnTo = returnFocusRef.current

    toast.dismiss(current.id)

    returnFocusRef.current = null

    if (hadFocus && returnTo?.isConnected) returnTo.focus()
  }, [current])

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Escape') return

      // The header listens for Escape on the document to close its drawer; the
      // key has done its job here and must not reach it.
      event.stopPropagation()

      onDismiss()
    },
    [onDismiss],
  )

  return { toast: current, toastRef, onPointerEnter, onPointerLeave, onFocus, onBlur, onKeyDown, onDismiss }
}
