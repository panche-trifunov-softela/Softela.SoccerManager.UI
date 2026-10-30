import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import type { MyTeamTacticsState } from './types'

/**
 * Names the club the address selects, for the tactics page's title bar.
 *
 * @returns The subtitle: the club and its game world when the signed-in manager runs it, otherwise
 * `null`.
 */
export function useMyTeamTactics(): MyTeamTacticsState {
  const { club } = useSelectedClub()

  return { subtitle: club === null ? null : toClubSubtitle(club) }
}
