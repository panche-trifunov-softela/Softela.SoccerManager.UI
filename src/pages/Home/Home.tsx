import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'

import { ROUTES } from '@/constants/routes'

import { AppliedClubs } from './components/AppliedClubs'
import { HomeSection } from './components/HomeSection'
import { LeagueApplications } from './components/LeagueApplications'
import { MyTeams } from './components/MyTeams'

import styles from './Home.module.scss'

/**
 * Landing page: the teams the signed-in manager runs, a way to add another, the clubs the
 * manager has applied to, and the applications made for clubs in the manager's leagues.
 *
 * @returns The rendered page.
 */
export function Home() {
  return (
    <div className={styles.sections}>
      <HomeSection
        title="My teams"
        titleAs="h1"
        action={
          <Link to={ROUTES.addTeam} className="btn focus-ring g-8">
            <FontAwesomeIcon icon={faPlus} />
            Add team
          </Link>
        }
      >
        <MyTeams />
      </HomeSection>

      <AppliedClubs />

      <LeagueApplications />
    </div>
  )
}
