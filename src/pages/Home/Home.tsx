import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'

import { ROUTES } from '@/constants/routes'

import { AppliedClubs } from './components/AppliedClubs'
import { MyTeams } from './components/MyTeams'

/**
 * Landing page: the teams the signed-in manager runs, a way to add another, and the clubs the
 * manager has applied to.
 *
 * @returns The rendered page.
 */
export function Home() {
  return (
    <div className="d-flex flex-column g-40">
      <section className="d-flex flex-column g-20">
        <div className="d-flex align-items-center justify-content-between g-20">
          <h1 className="h3">My teams</h1>

          <Link to={ROUTES.addTeam} className="btn focus-ring g-8">
            <FontAwesomeIcon icon={faPlus} />
            Add team
          </Link>
        </div>

        <MyTeams />
      </section>

      <AppliedClubs />
    </div>
  )
}
