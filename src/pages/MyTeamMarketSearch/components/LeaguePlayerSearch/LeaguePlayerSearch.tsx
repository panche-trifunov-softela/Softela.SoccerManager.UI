import { PlayerFilters } from '@/components/PlayerFilters'
import { PlayersTable } from '@/components/PlayersTable'

import { useLeaguePlayerSearch } from './useLeaguePlayerSearch'

import type { LeaguePlayerSearchProps } from './types'

/**
 * The players of one club's League, searched, filtered, sorted and paged by the API, with no
 * column of actions.
 *
 * @param props The club whose League is searched.
 * @returns The rendered filters and table.
 */
export function LeaguePlayerSearch({ leagueTeamId }: LeaguePlayerSearchProps) {
  const { query, search, filter, table } = useLeaguePlayerSearch(leagueTeamId)

  return (
    <>
      <PlayerFilters query={query} onSearch={search} onFilter={filter} />

      <PlayersTable {...table} lateColumns />
    </>
  )
}
