import { Link } from 'react-router'

import { ROUTES } from '@/constants/routes'

import { MyTeams } from './components/MyTeams'

/**
 * Landing page: the teams the signed-in manager runs, and a way to add
 * another.
 *
 * @returns The rendered page.
 */
export function Home() {
  return (
    <div className="d-flex flex-column g-20">
      <div className="d-flex align-items-center justify-content-between g-20">
        <h1 className="h3">My teams</h1>

        <Link to={ROUTES.addTeam} className="btn focus-ring g-8">
          <i className="icon-plus" aria-hidden="true" />
          Add team
        </Link>
      </div>

      <MyTeams />
    </div>
  )
}
