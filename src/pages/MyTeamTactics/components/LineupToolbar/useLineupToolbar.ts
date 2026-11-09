import { useRef } from 'react'

import type { SavedSituationView } from './components/SavedSituations'
import type { LineupToolbarOptions, LineupToolbarState } from './types'

/**
 * Keeps focus from falling back to the top of the page when the toolbar's own buttons go.
 *
 * Remove, Cancel, Add situation, Close Situation and a saved situation's Delete disappear when they
 * are pressed, as the selection or the open situation goes. This hands the view a ref for the
 * formation select and a handler for each button that calls the action and then moves focus to
 * the select.
 *
 * @param options What to call when the selected slot is emptied, when the selection is dropped,
 * when a situation is opened, when it is closed and when a saved one is deleted.
 * @returns The select's ref and the five handlers.
 */
export function useLineupToolbar({
  onRemove,
  onCancel,
  onAddSituation,
  onCloseSituation,
  onDeleteSituation,
}: LineupToolbarOptions): LineupToolbarState {
  const formationSelect = useRef<HTMLSelectElement>(null)

  const handleRemove = () => {
    onRemove()

    formationSelect.current?.focus()
  }

  const handleCancel = () => {
    onCancel()

    formationSelect.current?.focus()
  }

  const handleAddSituation = () => {
    onAddSituation()

    formationSelect.current?.focus()
  }

  const handleCloseSituation = () => {
    onCloseSituation()

    formationSelect.current?.focus()
  }

  const handleDeleteSituation = (item: SavedSituationView) => {
    onDeleteSituation(item)

    formationSelect.current?.focus()
  }

  return {
    formationSelect,
    handleRemove,
    handleCancel,
    handleAddSituation,
    handleCloseSituation,
    handleDeleteSituation,
  }
}
