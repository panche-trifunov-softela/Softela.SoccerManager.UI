import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router'

import { useScrollLock } from '@/hooks/useScrollLock'
import { offCanvas, offCanvasStore } from '@/store/offCanvas'

import { TRANSITION_FALLBACK_MS } from './constants'

import type { KeyboardEvent, TransitionEvent } from 'react'
import type { OffCanvasHostState, OpenSession, ShownPanel } from './types'

/**
 * Reads the open panel from the store and owns what makes it a modal: the
 * scroll lock, focus, the keyboard and closing on navigation.
 *
 * Flow for each panel:
 * 1. The panel is drawn, the page behind it turns inert, the page scroll is
 *    locked and focus moves into the panel.
 * 2. The close button, a click on the backdrop, `Escape` and any navigation
 *    close it.
 * 3. Closing returns focus to the element that had it before the panel opened,
 *    when that element is still in the page.
 * 4. The panel's content stays drawn during the slide-out and is dropped when
 *    the slide-out ends.
 * 5. Opening another panel while one is open replaces it, and the new content
 *    mounts afresh.
 *
 * @returns The panel to draw, whether it is open, the panel's ref and the handlers.
 */
export function useOffCanvasHost(): OffCanvasHostState {
  const current = useSyncExternalStore(offCanvasStore.subscribe, offCanvasStore.getSnapshot)
  const isOpen = current !== null

  const location = useLocation()

  const [shown, setShown] = useState<ShownPanel | null>(null)
  const [session, setSession] = useState<OpenSession | null>(null)

  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  // The panel stays drawn after it closes so its content is visible during the
  // slide-out; a new panel is drawn from the render that first sees it. Adjusting
  // state while rendering avoids an effect, which oxlint's set-state-in-effect
  // rule rejects.
  if (current !== null && current.id !== shown?.panel.id) {
    setShown({ panel: current, locationKey: location.key })
  }

  // The element to return focus to is read while rendering on purpose: the
  // commit that follows makes the page inert, and a browser may blur a focused
  // element once it is inert, so an effect could only read the body.
  if (isOpen && session === null) {
    setSession({ opener: document.activeElement })
  }

  if (!isOpen && session !== null) {
    setSession(null)
  }

  useEffect(() => {
    if (session === null) return

    return () => {
      const { opener } = session

      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [session])

  // Every new panel, first or replacement, takes focus, which is what lets
  // `Escape` reach the panel's own handler.
  const currentId = current?.id

  useEffect(() => {
    if (currentId !== undefined) panelRef.current?.focus()
  }, [currentId])

  // Every navigation gets a new location key, including Back and a link to the
  // current path. The id guard keeps a panel that a page opened from its mount
  // effect right after a navigation: child effects run before this one, and
  // that panel was drawn with the new key.
  const staleId =
    current !== null && shown?.panel.id === current.id && shown.locationKey !== location.key
      ? current.id
      : undefined

  useEffect(() => {
    if (staleId !== undefined) offCanvas.close(staleId)
  }, [staleId])

  // The panel lives in the module-level store but is drawn by this component. If
  // the host unmounts, the entry is closed so it cannot reappear on its own when
  // the host mounts again. Under StrictMode the simulated unmount closes a panel
  // that the children's re-run effects open again.
  useEffect(() => () => offCanvas.close(), [])

  // A closed panel's content is normally dropped by the slide-out's transition
  // end. When no transition runs (the content closed it from its own mount
  // effect, or an ancestor is hidden) that event never comes, so this timer
  // drops it instead and its timers and requests stop.
  const hasClosedContent = current === null && shown !== null

  useEffect(() => {
    if (!hasClosedContent) return

    const timer = window.setTimeout(() => {
      if (offCanvasStore.getSnapshot() === null) setShown(null)
    }, TRANSITION_FALLBACK_MS)

    return () => window.clearTimeout(timer)
  }, [hasClosedContent])

  useScrollLock(isOpen)

  // Focus can fall to the body while the panel is open, when the focused control
  // inside it is removed or disabled. Escape must still close the panel, and
  // before the header's and the toast's document listeners hear it, hence the
  // capture phase.
  useEffect(() => {
    if (!isOpen) return

    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || event.target !== document.body) return

      event.stopPropagation()

      offCanvas.close()
    }

    document.addEventListener('keydown', onDocumentKeyDown, true)

    return () => document.removeEventListener('keydown', onDocumentKeyDown, true)
  }, [isOpen])

  const onClose = () => offCanvas.close()

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return

    // The header drawer, its dropdowns and the toast listen for Escape on the
    // document; the key has closed the panel and must not reach them.
    event.stopPropagation()

    offCanvas.close()
  }

  // Transitions inside the content bubble up to the panel, so only the panel's
  // own visibility change, which ends last, counts.
  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'visibility') return

    if (offCanvasStore.getSnapshot() !== null) return

    setShown(null)
  }

  return { panel: shown?.panel ?? null, isOpen, titleId, panelRef, onClose, onKeyDown, onTransitionEnd }
}
