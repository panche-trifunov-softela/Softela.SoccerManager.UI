import { MISSING } from '@/constants/missing'

import { SUSPENDED_LABEL } from './constants'

import styles from './SquadListRow.module.scss'

import type { SquadListRowProps } from './types'

/**
 * One squad member as a full-width button: their squad number, name, position, rating and
 * condition. The slot they are in, for the starting eleven and the bench, is only in the row's
 * `ariaLabel`, as the groups the list is split into already show it.
 *
 * - A suspended player carries a "Suspended" tag, so it never rests on colour alone.
 * - A row that cannot be picked is disabled. While the board is locked every row is
 *   `aria-disabled` instead, so the row that was pressed keeps focus; the editor refuses the tap.
 * - The selected row has an accent bar on its start edge, a tinted background and a bolder name,
 *   so the selection never rests on the accent colour alone.
 * - A screen reader hears the row's `ariaLabel` in place of its cells.
 *
 * @param props The row to show, whether the board is locked, and what to call on a tap.
 * @returns The rendered row.
 */
export function SquadListRow({ row, isLocked, onTap }: SquadListRowProps) {
  return (
    <button
      type="button"
      className={`${styles.row} focus-ring${row.isSelectable ? '' : ` ${styles.unavailable}`}`}
      aria-pressed={row.isSelected}
      aria-label={row.ariaLabel}
      disabled={!row.isSelectable}
      aria-disabled={isLocked}
      onClick={() => {
        onTap(row.playerId)
      }}
    >
      <span className={`text-12 ${styles.number}`}>{row.squadNumber}</span>

      <span className={styles.who}>
        <span className={`h4 text-overflow ${styles.name}`} title={row.name}>
          {row.name}
        </span>

        {row.isSuspended ? <span className={styles.suspended}>{SUSPENDED_LABEL}</span> : null}
      </span>

      <span className={`text-12 ${styles.position}`}>
        <abbr title={row.positionName}>{row.positionShortName}</abbr>
      </span>

      <span className={styles.rating}>
        {row.rating === null ? (
          MISSING
        ) : (
          <span className="tag tag--accent tag--inline">{row.rating}</span>
        )}
      </span>

      <span className={`text-12 ${styles.condition}`}>{row.condition}</span>
    </button>
  )
}
