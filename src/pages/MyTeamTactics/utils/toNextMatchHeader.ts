import { AWAY_VENUE_LABEL, HOME_VENUE_LABEL, OPPONENT_TO_BE_DECIDED } from '../constants'

import { formatKickOff } from './formatKickOff'

import type { NextMatchDto } from '@/types/nextMatchDto'

import type { NextMatchHeaderProps } from '../components/NextMatchHeader'

/**
 * Writes the next match as the props of its header.
 *
 * A match with no second participant names its opponent as still to be decided.
 *
 * @param nextMatch The club's next match, as the API returned it.
 * @returns The opponent, the venue and the kick-off, with their texts already written.
 */
export function toNextMatchHeader(nextMatch: NextMatchDto): NextMatchHeaderProps {
  return {
    opponentName: nextMatch.opponentTeamName ?? OPPONENT_TO_BE_DECIDED,
    opponentLogoUrl: nextMatch.opponentTeamLogoUrl,
    venueLabel: nextMatch.isHomeTeam ? HOME_VENUE_LABEL : AWAY_VENUE_LABEL,
    kickOff: formatKickOff(nextMatch.startDateTime),
  }
}
