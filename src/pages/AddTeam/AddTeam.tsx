import { Link } from 'react-router'

import { ROUTES } from '@/constants/routes'

import { AvailableLeagues } from './components/AvailableLeagues'
import { LeagueSearchForm } from './components/LeagueSearchForm'
import { useAddTeam } from './useAddTeam'

import styles from './AddTeam.module.scss'

/**
 * Adding a team for the signed-in user to manage: a search over the leagues
 * they do not manage a club in yet, and the leagues it finds.
 *
 * @returns The rendered page.
 */
export function AddTeam() {
  const { searchTerm, search } = useAddTeam()

  return (
    <div className="d-flex flex-column g-20">
      <div className="d-flex align-items-center g-12">
        <Link
          to={ROUTES.home}
          className={`icon-btn icon-btn--blue focus-ring ${styles.back}`}
          aria-label="Back to my teams"
        >
          <i className="icon-arrow-left" aria-hidden="true" />
        </Link>

        <h1 className="h3">Add team</h1>
      </div>

      <LeagueSearchForm onSearch={search} />

      <AvailableLeagues searchTerm={searchTerm} />
    </div>
  )
}
