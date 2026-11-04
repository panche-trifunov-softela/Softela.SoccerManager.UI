import type { AvailableLeagueTeamDto } from '@/types/availableLeagueTeamDto'

import type { AvailableTeamRow } from '../components/AvailableTeamsTable'

/**
 * Turns a club the API returned into a row of the table.
 *
 * @param team The club as the API returns it.
 * @returns The row the table shows.
 */
export function toAvailableTeamRow(team: AvailableLeagueTeamDto): AvailableTeamRow {
  return {
    id: team.id,
    name: team.teamName,
    logoUrl: team.teamLogoUrl,
    finances: team.teamFinancialStateLabel,
    isManaged: team.isManaged,
    hasPendingApplication: team.hasPendingApplication,
  }
}
