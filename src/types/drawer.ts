import type { RefObject } from 'react'

/** Options of `useDrawer`. */
export interface DrawerOptions {
  /** The control inside the drawer that takes focus when it opens; focus stays where it is when omitted. */
  initialFocusRef?: RefObject<HTMLElement | null>

  /** Whether the drawer has anything to show; while false it stays closed. Defaults to `true`. */
  isEnabled?: boolean
}

/** What `useDrawer` hands the component's own hook. */
export interface DrawerState {
  /** Whether the drawer is open. */
  isOpen: boolean

  /** Id for the drawer element, referenced by the toggle's `aria-controls`. */
  id: string

  /** The toggle button, which receives focus when the drawer closes. */
  toggleRef: RefObject<HTMLButtonElement | null>

  /** The element whose subtree keeps the drawer open; focus moving outside it closes the drawer. */
  panelRef: RefObject<HTMLDivElement | null>

  /** Opens the drawer when closed and closes it when open. */
  toggle: () => void

  /** Closes the drawer and returns focus to the toggle. */
  close: () => void
}
