import styles from './AvailableTeamsTable.module.scss'

import type { AvailableTeamsTableProps } from './types'

/**
 * The clubs of one game world: one row per club, with its crest, how wealthy it is, and an
 * Apply button, or a Managed tag for a club that already has a manager. The Apply button is not
 * wired to the API yet.
 *
 * @param props The clubs to show.
 * @returns The rendered table.
 */
export function AvailableTeamsTable({ rows }: AvailableTeamsTableProps) {
  return (
    <div className="card">
      <table className={`table ${styles.table}`} aria-label="Clubs">
        <thead>
          <tr>
            <th scope="col" className="label h6">
              Club
            </th>
            <th scope="col" className={`label h6 ${styles.finances}`}>
              Finances
            </th>
            <th scope="col" className={`label h6 ${styles.status}`}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <div className="d-flex align-items-center g-12">
                  {row.logoUrl === null ? (
                    <span className="square square--icon" aria-hidden="true">
                      <i className="icon-ball" />
                    </span>
                  ) : (
                    <span className={`club-logo club-logo--md ${styles.logo}`}>
                      <img src={row.logoUrl} alt="" />
                    </span>
                  )}

                  <span className="h4 text-overflow">{row.name}</span>
                </div>
              </td>

              <td className={`text-12 ${styles.finances}`}>{row.finances}</td>

              <td className={styles.status}>
                {row.isManaged ? (
                  <span className={`label text-12 ${styles.managed}`}>Managed</span>
                ) : (
                  <button
                    type="button"
                    className="btn focus-ring"
                    aria-label={`Apply for ${row.name}`}
                  >
                    Apply
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
