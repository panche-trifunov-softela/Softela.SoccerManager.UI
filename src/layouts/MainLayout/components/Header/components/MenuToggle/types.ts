import type { Ref } from 'react'

/** Props of `MenuToggle`. */
export interface MenuToggleProps {
  /** Whether the menu this button controls is showing. */
  isOpen: boolean

  /** The id of the element this button opens and closes. */
  controls: string

  /** Called when the button is pressed. */
  onToggle: () => void

  /** Receives the button element, so focus can be returned to it. */
  ref?: Ref<HTMLButtonElement>
}
