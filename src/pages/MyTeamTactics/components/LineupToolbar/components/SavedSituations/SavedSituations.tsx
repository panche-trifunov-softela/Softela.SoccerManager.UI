import { DELETE_LABEL, EDIT_LABEL, SAVED_SITUATIONS_LABEL } from './constants'

import styles from './SavedSituations.module.scss'

import type { SavedSituationsProps } from './types'

/**
 * The club's saved situations as a list, one item per situation with its name, for example
 * `60 · Losing`, and an Edit and a Delete button.
 *
 * - The open situation is highlighted and marked as the current item.
 * - Delete acts at once, with no confirmation.
 * - While the board is locked every button is `aria-disabled` rather than `disabled`, so the one
 *   that was pressed keeps focus; the editor refuses the input.
 * - Each button's accessible name carries the situation's name, so the list's buttons are told
 *   apart.
 *
 * @param props The saved situations, whether the board is locked, and what each button calls.
 * @returns The rendered list.
 */
export function SavedSituations({ items, isLocked, onEdit, onDelete }: SavedSituationsProps) {
  return (
    <ul className={styles.list} aria-label={SAVED_SITUATIONS_LABEL}>
      {items.map((item) => (
        <li
          key={`${item.minuteAt}-${item.situation}`}
          className={`${styles.item}${item.isOpen ? ` ${styles.open}` : ''}`}
          aria-current={item.isOpen ? 'true' : undefined}
        >
          <span className={`text-12 ${styles.name}`}>{item.label}</span>

          <button
            type="button"
            className="btn btn--sm focus-ring"
            aria-label={`${EDIT_LABEL} ${item.label}`}
            aria-disabled={isLocked}
            onClick={() => {
              onEdit(item)
            }}
          >
            {EDIT_LABEL}
          </button>

          <button
            type="button"
            className="btn btn--sm focus-ring"
            aria-label={`${DELETE_LABEL} ${item.label}`}
            aria-disabled={isLocked}
            onClick={() => {
              onDelete(item)
            }}
          >
            {DELETE_LABEL}
          </button>
        </li>
      ))}
    </ul>
  )
}
