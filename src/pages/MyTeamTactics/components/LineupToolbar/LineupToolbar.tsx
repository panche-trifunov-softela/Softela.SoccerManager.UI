import { SavedSituations } from './components/SavedSituations'
import { SituationControls } from './components/SituationControls'
import { AUTO_PICK_LABEL, CANCEL_LABEL, FORMATION_LABEL, REMOVE_LABEL } from './constants'
import { useLineupToolbar } from './useLineupToolbar'

import styles from './LineupToolbar.module.scss'

import type { LineupToolbarProps } from './types'

/**
 * The lineup's controls: the formation select, the auto pick button, the situation controls and
 * the save status, then the list of saved situations, and under them a line that always says what
 * the next tap does, with a button to empty a filled slot and one to drop the selection while
 * something is selected.
 *
 * - While the board is locked every control is `aria-disabled` rather than `disabled`, so the one
 *   that was pressed keeps focus; the editor refuses the input.
 * - Auto pick shows only while no situation is open.
 * - The saved list shows only while a situation is saved.
 * - The selection line is always there, with a reserved height, so the pitch below never jumps.
 *   Remove and Cancel show only when they apply.
 * - When Remove, Cancel, Add situation, Close Situation or a Delete is pressed focus moves to the
 *   formation select, since the button pressed goes away, so it does not fall back to the top of
 *   the page.
 * - The save status and the hint are separate polite live regions, so a screen reader hears
 *   either change.
 *
 * @param props The formations and the lineup's, the situation controls and the saved list, the
 * board's state, and what each control calls.
 * @returns The rendered toolbar card.
 */
export function LineupToolbar({
  formations,
  formationId,
  isLocked,
  saveStatus,
  selectionHint,
  canRemove,
  hasSelection,
  canAutoPick,
  situationControls,
  savedSituations,
  onFormationChange,
  onAutoPick,
  onRemove,
  onCancel,
}: LineupToolbarProps) {
  const {
    formationSelect,
    handleRemove,
    handleCancel,
    handleAddSituation,
    handleCloseSituation,
    handleDeleteSituation,
  } = useLineupToolbar({
    onRemove,
    onCancel,
    onAddSituation: situationControls.onAdd,
    onCloseSituation: situationControls.onClose,
    onDeleteSituation: savedSituations.onDelete,
  })

  return (
    <div className="card card-padded d-flex flex-column g-12">
      <div className={styles.controls}>
        <label className={`d-flex flex-column g-6 ${styles.formation}`}>
          <span className="label text-10">{FORMATION_LABEL}</span>

          <select
            ref={formationSelect}
            className="field"
            value={formationId ?? ''}
            aria-disabled={isLocked}
            onChange={(event) => {
              onFormationChange(Number(event.target.value))
            }}
          >
            {formations.map((formation) => (
              <option key={formation.id} value={formation.id}>
                {formation.name}
              </option>
            ))}
          </select>
        </label>

        {canAutoPick ? (
          <button
            type="button"
            className="btn focus-ring"
            aria-disabled={isLocked}
            onClick={() => {
              onAutoPick()
            }}
          >
            {AUTO_PICK_LABEL}
          </button>
        ) : null}

        <SituationControls
          {...situationControls}
          onAdd={handleAddSituation}
          onClose={handleCloseSituation}
        />

        <p role="status" aria-live="polite" className={`label ${styles.status}`}>
          {saveStatus}
        </p>
      </div>

      {savedSituations.items.length > 0 ? (
        <SavedSituations {...savedSituations} onDelete={handleDeleteSituation} />
      ) : null}

      <div className={styles.selection}>
        <p aria-live="polite" className={`text-12 ${styles.hint}`}>
          {selectionHint}
        </p>

        {canRemove ? (
          <button
            type="button"
            className="btn btn--sm focus-ring"
            aria-disabled={isLocked}
            onClick={handleRemove}
          >
            {REMOVE_LABEL}
          </button>
        ) : null}

        {hasSelection ? (
          <button
            type="button"
            className="text-button focus-ring"
            aria-disabled={isLocked}
            onClick={handleCancel}
          >
            {CANCEL_LABEL}
          </button>
        ) : null}
      </div>
    </div>
  )
}
