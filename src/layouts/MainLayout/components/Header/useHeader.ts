import { useRef } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useDrawer } from '@/hooks/useDrawer'

import type { HeaderState } from './types'

/**
 * Reads the signed-in user, exposes a sign-out action, and wires the slide-in
 * menu to the shared drawer behaviour, focusing its close button on open.
 *
 * @returns The user data, the menu's state, refs and handlers.
 */
export function useHeader(): HeaderState {
  const { user, logout } = useAuth()

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { isOpen, id, toggleRef, panelRef, toggle, close } = useDrawer({ initialFocusRef: closeButtonRef })

  const signOut = () => {
    void logout()
  }

  return {
    username: user?.username ?? '',
    signOut,
    isMenuOpen: isOpen,
    menuId: id,
    toggleRef,
    menuRef: panelRef,
    closeButtonRef,
    toggleMenu: toggle,
    closeMenu: close,
  }
}
