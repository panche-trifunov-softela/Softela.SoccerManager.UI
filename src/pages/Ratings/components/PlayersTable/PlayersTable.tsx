import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Pager } from './components/Pager'
import { SortableHeader } from './components/SortableHeader'
import { VoteButtons } from './components/VoteButtons'
import { usePlayerVotes } from './hooks'
import { usePlayersTable } from './usePlayersTable'

import styles from './PlayersTable.module.scss'

import type { PlayersTableProps } from './types'

/**
 * The players the query finds: one row per player, from their photo to the
 * buttons that vote on their rating, with the headings that sort and a pager
 * under them.
 *
 * @param props The query being shown, and what to call when the reader sorts
 * or changes page.
 * @returns The rendered table and pager. The table, its headings and the pager
 * always render: a loading, error or empty state shows as a message under the
 * headings, in a live region. How a vote went is put into words in a toast.
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

  const { voteButtonsFor } = usePlayerVotes()

  return (
    <div className="card">
      <table className={`table ${styles.table}`} aria-label="Players" aria-busy={isLoading}>
        <thead>
          <tr>
            <th scope="col" className={styles.photo}>
              <span className="visually-hidden">Photo</span>
            </th>

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

            <SortableHeader
              label="Rating"
              sortBy="rating"
              className={styles.rating}
              activeSortBy={sortBy}
              sortDescending={sortDescending}
              onSort={onSort}
            />

            <th scope="col" className={styles.vote}>
              <span className="visually-hidden">Vote</span>
            </th>
          </tr>
        </thead>

        <tbody className={isLoading ? styles.stale : undefined}>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={styles.photo}>
                {row.imageUrl === null ? (
                  <span className="square square--icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                ) : (
                  <img
                    className={`square-avatar ${styles.portrait}`}
                    src={row.imageUrl}
                    alt=""
                    loading="lazy"
                  />
                )}
              </td>

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

              <td className={`text-12 ${styles.value}`}>{row.value}</td>

              <td className={`text-12 ${styles.wage}`}>{row.wage}</td>

              <td className={styles.rating}>
                <span className={`tag tag--accent ${styles.badge}`}>{row.rating}</span>
              </td>

              <td className={styles.vote}>
                <VoteButtons {...voteButtonsFor(row)} />
              </td>
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
