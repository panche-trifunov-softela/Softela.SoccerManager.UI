import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { useAuth } from '@/hooks/useAuth'

import type { HeaderState } from './types'

/**
 * Reads the signed-in user, exposes a sign-out action, and owns the slide-in
 * menu: its open state, its focus handling and the page scroll lock.
 *
 * Flow while the menu is open:
 * 1. The page scroll is locked and focus moves to the close button.
 * 2. `Escape` closes the menu and returns focus to the burger button.
 * 3. Focus leaving the menu, or the viewport growing until the burger button is
 *    hidden by CSS, closes it without moving focus.
 * 4. Any navigation closes it.
 *
 * @returns The user data, the menu's state, refs and handlers.
 */
export function useHeader(): HeaderState {
  const { user, logout } = useAuth()
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuLocationKey, setMenuLocationKey] = useState(location.key)

  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Every navigation gets a new location key, including Back and a link to the
  // current path. Adjusting state while rendering avoids an effect, which
  // oxlint's set-state-in-effect rule rejects.
  if (menuLocationKey !== location.key) {
    setMenuLocationKey(location.key)
    setIsMenuOpen(false)
  }

  const signOut = useCallback(() => {
    void logout()
  }, [logout])

  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const root = document.documentElement

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setIsMenuOpen(false)
    }

    // The burger is hidden by CSS once the menu becomes an inline row, so
    // asking the element keeps the breakpoint out of this file.
    const handleResize = () => {
      if (toggleRef.current?.getClientRects().length === 0) setIsMenuOpen(false)
    }

    root.classList.add('no-scroll')
    closeButtonRef.current?.focus()

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    window.addEventListener('resize', handleResize)

    return () => {
      root.classList.remove('no-scroll')

      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen, closeMenu])

  return {
    username: user?.username ?? '',
    signOut,
    isMenuOpen,
    menuId,
    toggleRef,
    menuRef,
    closeButtonRef,
    toggleMenu,
    closeMenu,
  }
}
