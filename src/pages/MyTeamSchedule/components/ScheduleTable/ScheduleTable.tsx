import { ClubLogo } from '@/components/ClubLogo'

import styles from './ScheduleTable.module.scss'

import type { ScheduleTableProps } from './types'

/**
 * One club's schedule: a row per match with its kick-off, opponent, competition and result.
 *
 * - The opponent's crest and name carry the venue, Home or Away, beneath them.
 * - The competition carries the round beneath it, when there is one.
 * - A finished match shows its score in a pill: green for a win, yellow for a draw, red for a
 *   loss. A shoot-out shows beneath it. Any other match shows a dash.
 *
 * Below md the competition is hidden, so the kick-off, the opponent and the result remain.
 *
 * @param props The matches to show, in order.
 * @returns The rendered table.
 */
export function ScheduleTable({ rows }: ScheduleTableProps) {
  return (
    <div className="card">
      <table className={`table ${styles.table}`} aria-label="Schedule">
        <thead>
          <tr>
            <th scope="col" className={`label h6 ${styles.kick_off}`}>
              Kick-off
            </th>

            <th scope="col" className="label h6">
              Opponent
            </th>

            <th scope="col" className={`label h6 ${styles.competition}`}>
              Competition
            </th>

            <th scope="col" className={`label h6 ${styles.result}`}>
              Result
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td className={`text-12 ${styles.kick_off}`}>{row.kickOff}</td>

              <td>
                <div className="d-flex align-items-center g-12">
                  <ClubLogo logoUrl={row.opponentLogoUrl} size="md" />

                  <div className={styles.opponent}>
                    <div className="h4 text-overflow">{row.opponentName}</div>

                    <div className="label text-10">{row.venueLabel}</div>
                  </div>
                </div>
              </td>

              <td className={`text-12 ${styles.competition}`}>
                <div className="text-overflow">{row.competitionName}</div>

                {row.stageName !== null && (
                  <div className="label text-10 text-overflow">{row.stageName}</div>
                )}
              </td>

              <td className={`text-12 ${styles.result}`}>
                {row.outcome === null ? (
                  row.score
                ) : (
                  <span className={`text-600 level-pill ${styles[`outcome--${row.outcome}`]}`}>
                    <span className="visually-hidden">{row.outcomeLabel} </span>
                    {row.score}
                  </span>
                )}

                {row.outcome !== null && row.shootout !== null && (
                  <div className={`label text-10 ${styles.shootout}`}>{row.shootout}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
