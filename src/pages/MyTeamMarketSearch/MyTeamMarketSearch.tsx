import { PageTitle } from '@/components/PageTitle'
import { CLUB_NOT_FOUND_MESSAGE } from '@/constants/clubNotFound'
import { ROUTES } from '@/constants/routes'

import { LeaguePlayerSearch } from './components/LeaguePlayerSearch'
import { useMyTeamMarketSearch } from './useMyTeamMarketSearch'

/**
 * The player search of a club the signed-in user manages, over the players of its League.
 *
 * - An address with no valid id shows that the club could not be found.
 * - Each club's search starts fresh, so switching clubs resets the filters.
 *
 * @returns The rendered page.
 */
export function MyTeamMarketSearch() {
  const { leagueTeamId, subtitle } = useMyTeamMarketSearch()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title="Search players"
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel="Back to my teams"
      />

      {leagueTeamId === null ? (
        <p className="label">{CLUB_NOT_FOUND_MESSAGE}</p>
      ) : (
        <LeaguePlayerSearch key={leagueTeamId} leagueTeamId={leagueTeamId} />
      )}
    </div>
  )
}
