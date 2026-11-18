import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import type { ClubPlaceholderPageState } from './types'

/**
 * Names the club the address selects for a placeholder page's subtitle.
 *
 * - The subtitle is `null` while the user's clubs load, after they failed to load, and when the
 *   address names no valid club or one the user does not run.
 *
 * @returns The subtitle: the club's name and game world, or `null`.
 */
export function useClubPlaceholderPage(): ClubPlaceholderPageState {
  const { club } = useSelectedClub()

  return { subtitle: club === null ? null : toClubSubtitle(club) }
}
