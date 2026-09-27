import { Link } from 'react-router'

import { useMyTeamCard } from './useMyTeamCard'

import styles from './MyTeamCard.module.scss'

import type { MyTeamCardProps } from './types'

/**
 * One team: the club managed, the league it plays in, and the span the
 * tenure covers. The whole card links to the team's news feed.
 *
 * @param props The team the card describes.
 * @returns The rendered card.
 */
export function MyTeamCard({ team }: MyTeamCardProps) {
  const { accent, tenure, newsFeedPath } = useMyTeamCard(team)

  return (
    <article className="card border-color-bottom" style={{ borderBottomColor: accent }}>
      <div className="card_header d-flex align-items-center g-16">
        <span className={`club-logo club-logo--lg ${styles.crest}`}>
          {team.teamLogoUrl === null ? (
            <i className="icon-ball" aria-hidden="true" />
          ) : (
            <img src={team.teamLogoUrl} alt="" />
          )}
        </span>

        <div className={styles.names}>
          <Link to={newsFeedPath} className={`h4 text-overflow ${styles.link}`}>
            {team.teamName}
          </Link>
          <p className="label text-10">{team.leagueName}</p>
        </div>
      </div>

      <div className="card_footer--sm justify-content-between">
        <span className="text-10">{tenure}</span>
        {team.isCurrent && <span className="label text-10">Current</span>}
      </div>
    </article>
  )
}
