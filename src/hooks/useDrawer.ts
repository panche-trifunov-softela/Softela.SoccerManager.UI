import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { useScrollLock } from '@/hooks/useScrollLock'

import type { DrawerOptions, DrawerState } from '@/types/drawer'

/**
 * Owns a slide-in drawer's open state and its dismissal: scroll lock, focus
 * handling and every way it closes. The CSS decides what the drawer looks like,
 * including the breakpoint where it stops being one.
 *
 * Flow while the drawer is open:
 * 1. The page scroll is locked and focus moves to `initialFocusRef`, if given.
 * 2. `Escape` closes it and returns focus to the toggle.
 * 3. Focus leaving the panel, or the viewport growing until the toggle is hidden
 *    by CSS, closes it without moving focus.
 * 4. Any navigation closes it; focus that was inside it moves to the toggle.
 * 5. Losing `isEnabled` closes it.
 *
 * @param options The control to focus on open, and whether there is anything to open.
 * @returns The drawer's state, refs and handlers.
 */
export function useDrawer({ initialFocusRef, isEnabled = true }: DrawerOptions = {}): DrawerState {
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [drawerLocationKey, setDrawerLocationKey] = useState(location.key)

  const id = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Every navigation gets a new location key, including Back and a link to the
  // current path. Adjusting state while rendering avoids an effect, which
  // oxlint's set-state-in-effect rule rejects.
  if (drawerLocationKey !== location.key) {
    setDrawerLocationKey(location.key)
    setIsOpen(false)
  }

  // Nothing left to show: close, so the scroll lock goes too.
  if (isOpen && !isEnabled) {
    setIsOpen(false)
  }

  useScrollLock(isOpen)

  // A link inside the drawer is hidden once it closes, which would drop focus to
  // the page, so focus moves to the toggle first. Where CSS hides the toggle,
  // focus() does nothing and focus stays on the link.
  useLayoutEffect(() => {
    if (panelRef.current?.contains(document.activeElement)) toggleRef.current?.focus()
  }, [location.key])

  const toggle = useCallback(() => setIsOpen((open) => !open), [])

  const close = useCallback(() => {
    setIsOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !panelRef.current?.contains(event.target)) setIsOpen(false)
    }

    // The toggle is hidden by CSS once the drawer becomes part of the page, so
    // asking the element keeps the breakpoint out of this file.
    const handleResize = () => {
      if (toggleRef.current?.getClientRects().length === 0) setIsOpen(false)
    }

    initialFocusRef?.current?.focus()

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, close, initialFocusRef])

  return { isOpen, id, toggleRef, panelRef, toggle, close }
}
