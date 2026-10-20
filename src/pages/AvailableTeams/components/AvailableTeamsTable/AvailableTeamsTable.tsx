import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAvailableTeamsTable } from './useAvailableTeamsTable'

import styles from './AvailableTeamsTable.module.scss'

import type { AvailableTeamsTableProps } from './types'

/**
 * The clubs of one game world: one row per club, with its crest, how wealthy it is, and its
 * status.
 *
 * - A free club has an Apply button, which applies for it and goes Home.
 * - A managed club shows a Managed tag.
 * - A club the reader has applied for shows an Applied tag. While one does, no other club has an
 *   Apply button.
 * - Why an application failed shows under the table, in a live region.
 *
 * @param props The clubs to show.
 * @returns The rendered table.
 */
export function AvailableTeamsTable({ rows }: AvailableTeamsTableProps) {
  const { applyingId, error, canApply, apply } = useAvailableTeamsTable(rows)

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
                      <FontAwesomeIcon icon={faFutbol} />
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
                  <span className={`label text-12 ${styles.status_tag}`}>Managed</span>
                ) : row.hasPendingApplication ? (
                  <span className={`label text-12 ${styles.status_tag}`}>Applied</span>
                ) : canApply ? (
                  <button
                    type="button"
                    className="btn focus-ring"
                    aria-label={
                      applyingId === row.id ? `Applying for ${row.name}` : `Apply for ${row.name}`
                    }
                    aria-disabled={applyingId !== null}
                    onClick={() => {
                      apply(row)
                    }}
                  >
                    {applyingId === row.id ? 'Applying…' : 'Apply'}
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div role="status">{error !== null && <p className="label card-padded">{error}</p>}</div>
    </div>
  )
}
