import { SquadListRow } from './components/SquadListRow'
import {
  BENCH_CAPACITY,
  BENCH_TITLE,
  NOT_SELECTED_TITLE,
  SQUAD_LABEL,
  STARTERS_CAPACITY,
  STARTERS_TITLE,
} from './constants'

import styles from './LineupSquadList.module.scss'

import type { LineupSquadListProps } from './types'

/**
 * The squad as a list in three titled groups: the starting eleven, the bench, and everyone else.
 * The starting eleven and the bench show how many of their places are filled.
 *
 * @param props The three groups of rows, whether the board is locked, and what to call on a tap.
 * @returns The rendered squad card.
 */
export function LineupSquadList({
  starters,
  bench,
  notSelected,
  isLocked,
  onPlayerTap,
}: LineupSquadListProps) {
  const groups = [
    {
      id: 'starters',
      title: `${STARTERS_TITLE} (${starters.length}/${STARTERS_CAPACITY})`,
      rows: starters,
    },
    {
      id: 'bench',
      title: `${BENCH_TITLE} (${bench.length}/${BENCH_CAPACITY})`,
      rows: bench,
    },
    {
      id: 'notSelected',
      title: `${NOT_SELECTED_TITLE} (${notSelected.length})`,
      rows: notSelected,
    },
  ]

  return (
    <section aria-label={SQUAD_LABEL} className="card">
      {groups.map(({ id, title, rows }) => (
        <div key={id}>
          <h2 className={`label h6 ${styles.title}`}>{title}</h2>

          {rows.length > 0 ? (
            <ul className={styles.rows}>
              {rows.map((row) => (
                <li key={row.playerId}>
                  <SquadListRow row={row} isLocked={isLocked} onTap={onPlayerTap} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </section>
  )
}
