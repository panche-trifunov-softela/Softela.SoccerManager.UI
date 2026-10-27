import { ClubLogo } from '@/components/ClubLogo'

import { useAvailableTeamsTable } from './useAvailableTeamsTable'

import styles from './AvailableTeamsTable.module.scss'

import type { AvailableTeamsTableProps } from './types'

/**
 * The clubs of one game world: one row per club, with its crest, how wealthy it is, and its
 * status.
 *
 * - A free club has an Apply button, which applies for it and reloads the clubs, staying on the
 *   page.
 * - A managed club shows a Managed tag.
 * - A club the reader has applied for shows an Applied tag. While one does, no other club has an
 *   Apply button.
 * - Clicking a club's row, or its name from the keyboard, opens its squad in the side panel.
 *   Apply does not.
 *
 * @param props The clubs to show, and what re-reads them after an application went through.
 * @returns The rendered table.
 */
export function AvailableTeamsTable({ rows, onApplied }: AvailableTeamsTableProps) {
  const { applyingId, canApply, apply, showSquad } = useAvailableTeamsTable(rows, onApplied)

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
            <tr
              key={row.id}
              tabIndex={-1}
              className={`c-pointer focus-ring ${styles.row}`}
              onClick={() => {
                showSquad(row)
              }}
            >
              <td>
                <div className="d-flex align-items-center g-12">
                  <ClubLogo logoUrl={row.logoUrl} size="md" />

                  <button
                    type="button"
                    className={`h4 text-overflow focus-ring ${styles.name}`}
                    aria-label={`Show the squad of ${row.name}`}
                  >
                    {row.name}
                  </button>
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
                    onClick={(event) => {
                      event.stopPropagation()

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
    </div>
  )
}
