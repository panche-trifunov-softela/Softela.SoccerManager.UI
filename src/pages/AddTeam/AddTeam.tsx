import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { AvailableLeagues } from './components/AvailableLeagues'
import { LeagueSearchForm } from './components/LeagueSearchForm'
import { useAddTeam } from './useAddTeam'

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
      <PageTitle title="Add team" backTo={ROUTES.home} backLabel="Back to my teams" />

      <LeagueSearchForm onSearch={search} />

      <AvailableLeagues searchTerm={searchTerm} />
    </div>
  )
}
