import type { KeyboardEvent, ReactNode, RefObject, TransitionEvent } from 'react'
import type { OffCanvas } from '@/types/offCanvas'

/** What the `OffCanvasHost` view receives from its parent. */
export interface OffCanvasHostProps {
  /** The page the panel opens over. */
  children: ReactNode
}

/** The panel the view draws, and where in the app it was opened. */
export interface ShownPanel {
  /** The panel being drawn; it outlives its closing until the slide-out ends. */
  panel: OffCanvas

  /** The router location key when the panel started showing, to spot a navigation. */
  locationKey: string
}

/** One continuous time the panel was open, from its first opening to its close. */
export interface OpenSession {
  /** The element that had focus when the panel opened, or `null` when none had. */
  opener: Element | null
}

/** What `useOffCanvasHost` hands the `OffCanvasHost` view. */
export interface OffCanvasHostState {
  /** The panel to draw, or `null` when none has been opened or its slide-out has ended. */
  panel: OffCanvas | null

  /** Whether a panel is open right now. */
  isOpen: boolean

  /** The id that ties the dialog's name to the panel's heading. */
  titleId: string

  /** Attached to the panel element so the hook can move focus into it. */
  panelRef: RefObject<HTMLDivElement | null>

  /** Closes the open panel; wired to the backdrop and the close button. */
  onClose: () => void

  /** Closes the panel on `Escape`. */
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void

  /** Drops a closed panel's content once its slide-out has finished. */
  onTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void
}
