import { MISSING } from '@/constants/missing'
import { OPPONENT_TO_BE_DECIDED } from '@/constants/opponentToBeDecided'
import { AWAY_VENUE_LABEL, HOME_VENUE_LABEL } from '@/constants/venueLabels'
import { formatKickOff } from '@/utils/formatKickOff'

import { FRIENDLY_LABEL, SHOOTOUT_SUFFIX } from '../constants'

import type { LeagueTeamScheduleMatchDto } from '@/types/leagueTeamScheduleMatchDto'

import type { ScheduleRow } from '../components/ScheduleTable'

/**
 * Turns a match the API returned into a row of the table, with its texts already written for
 * display.
 *
 * - The score and the shoot-out read the club's goals first, joined by an en dash.
 * - The score is `MISSING` until the match is finished, and the shoot-out is `null` unless both
 *   of its sides are present.
 *
 * @param match The match as the API returns it.
 * @returns The row the table shows.
 */
export function toScheduleRow(match: LeagueTeamScheduleMatchDto): ScheduleRow {
  const { goalsFor, goalsAgainst, shootoutGoalsFor, shootoutGoalsAgainst } = match

  const score = goalsFor !== null && goalsAgainst !== null ? `${goalsFor}–${goalsAgainst}` : MISSING

  const shootout =
    shootoutGoalsFor !== null && shootoutGoalsAgainst !== null
      ? `${shootoutGoalsFor}–${shootoutGoalsAgainst} ${SHOOTOUT_SUFFIX}`
      : null

  return {
    key: match.matchId,
    kickOff: formatKickOff(match.startDateTime),
    opponentName: match.opponentTeamName ?? OPPONENT_TO_BE_DECIDED,
    opponentLogoUrl: match.opponentTeamLogoUrl,
    venueLabel: match.isHomeTeam ? HOME_VENUE_LABEL : AWAY_VENUE_LABEL,
    competitionName: match.competitionName ?? FRIENDLY_LABEL,
    stageName: match.stageName,
    score,
    shootout,
    outcome: match.outcome,
    outcomeLabel: match.outcomeLabel,
  }
}
