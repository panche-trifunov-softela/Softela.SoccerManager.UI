import { useAvailableLeagues } from './useAvailableLeagues'

import styles from './AvailableLeagues.module.scss'

import type { AvailableLeaguesProps } from './types'

/**
 * The leagues the signed-in user could add a team in: one row per league,
 * with the day it was created.
 *
 * @param props The search the leagues are narrowed by.
 * @returns The rendered table, or what stands in for it while the read is in
 * flight, failed, or came back empty.
 */
export function AvailableLeagues({ searchTerm }: AvailableLeaguesProps) {
  const { rows, isLoading, error, isEmpty } = useAvailableLeagues(searchTerm)

  if (isLoading) return <p className="label">Loading game worlds…</p>

  if (error !== null) return <p className="label">{error}</p>

  if (isEmpty) {
    return (
      <p className="label">
        {searchTerm === null
          ? 'There are no game worlds to show yet.'
          : `No game worlds match “${searchTerm}”.`}
      </p>
    )
  }

  return (
    <div className="card">
      <table className={styles.table} aria-label="Game worlds">
        <thead>
          <tr>
            <th scope="col" className="label h6">
              Game world
            </th>
            <th scope="col" className={`label h6 ${styles.created}`}>
              Created
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <div className="d-flex align-items-center g-12">
                  <span className={`square ${styles.tile}`} aria-hidden="true">
                    <i className="icon-ball" />
                  </span>

                  <span className="h4 text-overflow">{row.name}</span>
                </div>
              </td>

              <td className={`text-12 ${styles.created}`}>{row.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
