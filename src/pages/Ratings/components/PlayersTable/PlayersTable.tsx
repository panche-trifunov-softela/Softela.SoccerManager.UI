import { Pager } from './components/Pager'
import { SortableHeader } from './components/SortableHeader'
import { usePlayersTable } from './usePlayersTable'

import styles from './PlayersTable.module.scss'

import type { PlayersTableProps } from './types'

/**
 * The players the query finds: one row per player, with the headings that
 * sort and a pager under them.
 *
 * @param props The query being shown, and what to call when the reader sorts
 * or changes page.
 * @returns The rendered table and pager. The table, its headings and the pager
 * always render: a loading, error or empty state shows as a message under the
 * headings, in a live region.
 */
export function PlayersTable({ query, onSort, onPageChange }: PlayersTableProps) {
  const {
    rows,
    isLoading,
    message,
    sortBy,
    sortDescending,
    summary,
    canGoBack,
    canGoForward,
    goToPrevious,
    goToNext,
  } = usePlayersTable(query, onPageChange)

  return (
    <div className="card">
      <table className={`table ${styles.table}`} aria-label="Players" aria-busy={isLoading}>
        <thead>
          <tr>
            <SortableHeader
              label="Player"
              sortBy="name"
              activeSortBy={sortBy}
              sortDescending={sortDescending}
              onSort={onSort}
            />

            <th scope="col" className={`label h6 ${styles.position}`}>
              Position
            </th>

            <SortableHeader
              label="Age"
              sortBy="age"
              className={styles.age}
              activeSortBy={sortBy}
              sortDescending={sortDescending}
              onSort={onSort}
            />

            <th scope="col" className={`label h6 ${styles.club}`}>
              Club
            </th>

            <th scope="col" className={`label h6 ${styles.nationality}`}>
              Nationality
            </th>

            <SortableHeader
              label="Rating"
              sortBy="rating"
              className={styles.rating}
              activeSortBy={sortBy}
              sortDescending={sortDescending}
              onSort={onSort}
            />

            <SortableHeader
              label="Value"
              sortBy="value"
              className={styles.value}
              activeSortBy={sortBy}
              sortDescending={sortDescending}
              onSort={onSort}
            />

            <SortableHeader
              label="Wage"
              sortBy="wage"
              className={styles.wage}
              activeSortBy={sortBy}
              sortDescending={sortDescending}
              onSort={onSort}
            />
          </tr>
        </thead>

        <tbody className={isLoading ? styles.stale : undefined}>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <span className="h4 text-overflow d-block">{row.name}</span>

                <span className={`label text-10 text-overflow ${styles.position_inline}`}>
                  {row.position}
                </span>
              </td>

              <td className={`text-12 text-overflow ${styles.position}`}>{row.position}</td>

              <td className={`text-12 ${styles.age}`}>{row.age}</td>

              <td className={`text-12 text-overflow ${styles.club}`}>{row.club}</td>

              <td className={`text-12 text-overflow ${styles.nationality}`}>{row.nationality}</td>

              <td className={styles.rating}>
                <span className={`tag tag--accent ${styles.badge}`}>{row.rating}</span>
              </td>

              <td className={`text-12 ${styles.value}`}>{row.value}</td>

              <td className={`text-12 ${styles.wage}`}>{row.wage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div role="status">{message !== null && <p className="label card-padded">{message}</p>}</div>

      <Pager
        summary={summary}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  )
}
