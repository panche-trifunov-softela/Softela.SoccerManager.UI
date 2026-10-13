import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { AvailableTeamsTable } from './components/AvailableTeamsTable'
import { useAvailableTeams } from './useAvailableTeams'

/**
 * The clubs of one game world: the second step of adding a team. A free club shows an Apply
 * button, and a managed one a Managed tag.
 *
 * @returns The rendered page.
 */
export function AvailableTeams() {
  const { leagueName, rows, message } = useAvailableTeams()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title="Clubs"
        subtitle={leagueName}
        backTo={ROUTES.addTeam}
        backLabel="Back to game worlds"
      />

      {message === null ? <AvailableTeamsTable rows={rows} /> : <p className="label">{message}</p>}
    </div>
  )
}
