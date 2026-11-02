import { useRef } from 'react'

import type { LineupToolbarOptions, LineupToolbarState } from './types'

/**
 * Keeps focus from falling back to the top of the page when the toolbar's own buttons go.
 *
 * Remove and Cancel disappear when they are pressed, as the selection goes. This hands the view a
 * ref for the formation select and a handler for each button that calls the action and then moves
 * focus to the select.
 *
 * @param options What to call when the selected slot is emptied and when the selection is dropped.
 * @returns The select's ref and the two handlers.
 */
export function useLineupToolbar({ onRemove, onCancel }: LineupToolbarOptions): LineupToolbarState {
  const formationSelect = useRef<HTMLSelectElement>(null)

  const handleRemove = () => {
    onRemove()

    formationSelect.current?.focus()
  }

  const handleCancel = () => {
    onCancel()

    formationSelect.current?.focus()
  }

  return { formationSelect, handleRemove, handleCancel }
}
