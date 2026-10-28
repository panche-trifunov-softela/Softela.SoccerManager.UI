import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ClubLogo } from '@/components/ClubLogo'

import { MISSING } from './constants'
import { useTeamSquad } from './useTeamSquad'

import styles from './TeamSquad.module.scss'

import type { TeamSquadProps } from './types'

/**
 * A club's squad, as the side panel shows it: the club's crest and name, then one row per
 * player with their photo, name, main position and rating.
 *
 * @param props The league team whose squad to show, and the club's name and logo.
 * @returns The rendered crest, name and table. The table and its headings always render: a
 * loading, error or empty state shows as a message under the headings, in a live region.
 */
export function TeamSquad({ leagueTeamId, name, logoUrl }: TeamSquadProps) {
  const { rows, message } = useTeamSquad(leagueTeamId)

  return (
    <div className="d-flex flex-column g-16">
      <div className="d-flex align-items-center g-16">
        <ClubLogo logoUrl={logoUrl} size="lg" />

        <h3 className={`h4 text-overflow ${styles.name}`}>{name}</h3>
      </div>

      <div>
        <table className={`table ${styles.table}`} aria-label="Players">
          <thead>
            <tr>
              <th scope="col" className={styles.photo}>
                <span className="visually-hidden">Photo</span>
              </th>

              <th scope="col" className="label h6">
                Name
              </th>

              <th scope="col" className={`label h6 ${styles.position}`}>
                Position
              </th>

              <th scope="col" className={`label h6 ${styles.rating}`}>
                Rating
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className={styles.photo}>
                  {row.imageUrl === null ? (
                    <span className="square square--icon" aria-hidden="true">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  ) : (
                    <img
                      className="square-avatar square-avatar--photo"
                      src={row.imageUrl}
                      alt=""
                      loading="lazy"
                    />
                  )}
                </td>

                <td>
                  <span className="h4 text-overflow d-block">{row.name}</span>
                </td>

                <td className={`text-12 text-overflow ${styles.position}`}>{row.position}</td>

                <td className={styles.rating}>
                  {row.rating === null ? (
                    MISSING
                  ) : (
                    <span className="tag tag--accent tag--inline">{row.rating}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div role="status">
          {message !== null && <p className={`label ${styles.message}`}>{message}</p>}
        </div>
      </div>
    </div>
  )
}
