import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import type { MyTeamMarketSearchState } from './types'

/**
 * Names the club the address selects for the page's subtitle, and says which club to search for.
 *
 * - The subtitle is `null` while the user's clubs load, after they failed to load, and when the
 *   address names no valid club or one the user does not run.
 * - The club id is the one in the address, or `null` when it holds no valid id.
 *
 * @returns The club's id and the subtitle: the club's name and game world, or `null`.
 */
export function useMyTeamMarketSearch(): MyTeamMarketSearchState {
  const { leagueTeamId, club } = useSelectedClub()

  return { leagueTeamId, subtitle: club === null ? null : toClubSubtitle(club) }
}
