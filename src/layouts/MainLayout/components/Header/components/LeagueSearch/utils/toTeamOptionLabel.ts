import { LABEL_SEPARATOR, TEAM_LABEL } from '../constants'

import type { LeagueSearchTeamItemDto } from '@/types/leagueSearchTeamItemDto'

/**
 * Writes the one accessible name of a team's option.
 *
 * @param team The team the option stands for.
 * @returns The team's name and that it is a team, for example `Real Silvania, team`.
 */
export function toTeamOptionLabel(team: LeagueSearchTeamItemDto): string {
  return `${team.teamName}${LABEL_SEPARATOR}${TEAM_LABEL}`
}
