import type { RefObject } from 'react'

/** What `useHeader` hands the view. */
export interface HeaderState {
  /** The signed-in user's name; empty when nobody is signed in. */
  username: string

  /**
   * The league team id of the club the signed-in manager acts as on the page, or `null` when the
   * page has no club of theirs, such as one in a league where they run none.
   */
  actingClubId: number | null

  /** Ends the session. */
  signOut: () => void

  /** Whether the slide-in menu is showing. */
  isMenuOpen: boolean

  /** Id of the menu element, referenced by the burger button. */
  menuId: string

  /** The burger button, which receives focus when the menu closes. */
  toggleRef: RefObject<HTMLButtonElement | null>

  /** The menu container, outside of which focus closes the menu. */
  menuRef: RefObject<HTMLDivElement | null>

  /** The close button inside the menu, which receives focus when the menu opens. */
  closeButtonRef: RefObject<HTMLButtonElement | null>

  /** Opens the menu when closed and closes it when open. */
  toggleMenu: () => void

  /** Closes the menu and returns focus to the burger button. */
  closeMenu: () => void
}
