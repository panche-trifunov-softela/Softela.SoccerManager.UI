import { PlayerPhoto } from '@/components/PlayerPhoto'
import { MISSING } from '@/constants/missing'

import { Pager } from './components/Pager'
import { SortableHeader } from './components/SortableHeader'
import { usePlayersTable } from './usePlayersTable'

import styles from './PlayersTable.module.scss'

import type { PlayerRow, PlayersTableProps } from './types'

/**
 * A page of players: one row per player, from their photo to their rating and an optional extra
 * column, with the headings that sort and a pager under them.
 *
 * @param props The query and the page being shown, whether it is loading, what to call when the
 * reader sorts, changes page or opens a player, and the extra column if there is one.
 * @returns The rendered table and pager. The table, its headings and the pager always render: a
 * loading, error or empty state shows as a message under the headings, in a live region. A
 * player's name is a button that opens their profile.
 */
export function PlayersTable<TRow extends PlayerRow>(props: PlayersTableProps<TRow>) {
  const { rows, isLoading, onSort, onOpen, actions, lateColumns } = props

  const {
    message,
    sortBy,
    sortDescending,
    summary,
    canGoBack,
    canGoForward,
    goToPrevious,
    goToNext,
  } = usePlayersTable(props)

  return (
    <div className="card">
      <table
        className={`table ${styles.table}${lateColumns === true ? ` ${styles.late}` : ''}`}
        aria-label="Players"
        aria-busy={isLoading}
      >
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

            {actions !== undefined && (
              <th scope="col" className={`${styles.actions} ${actions.className}`}>
                <span className="visually-hidden">{actions.label}</span>
              </th>
            )}
          </tr>
        </thead>

        <tbody className={isLoading ? styles.stale : undefined}>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={styles.photo}>
                <PlayerPhoto imageUrl={row.imageUrl} />
              </td>

              <td>
                <button
                  type="button"
                  className={`h4 text-overflow d-block focus-ring ${styles.name}`}
                  aria-haspopup="dialog"
                  onClick={() => {
                    onOpen(row)
                  }}
                >
                  {row.name}
                </button>

                <span className={`label text-10 text-overflow ${styles.position_inline}`}>
                  <abbr title={row.positionName}>{row.positionShortName}</abbr>
                </span>
              </td>

              <td className={`text-12 text-overflow ${styles.position}`}>
                <abbr title={row.positionName}>{row.positionShortName}</abbr>
              </td>

              <td className={`text-12 ${styles.age}`}>{row.age}</td>

              <td className={`text-12 text-overflow ${styles.club}`}>{row.club}</td>

              <td className={`text-12 text-overflow ${styles.nationality}`}>{row.nationality}</td>

              <td className={`text-12 ${styles.value}`}>{row.value}</td>

              <td className={`text-12 ${styles.wage}`}>{row.wage}</td>

              <td className={styles.rating}>
                {row.rating === null ? (
                  MISSING
                ) : (
                  <span className="tag tag--accent tag--inline">{row.rating}</span>
                )}
              </td>

              {actions !== undefined && (
                <td className={`${styles.actions} ${actions.className}`}>{actions.render(row)}</td>
              )}
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
