import { LEAGUE_ACCENTS } from '../constants'

/**
 * Picks the colour a league's cards are edged with.
 *
 * @param leagueId The identifier of the league the appointment belongs to.
 * @returns One of {@link LEAGUE_ACCENTS}, the same one for the same league.
 */
export function accentForLeague(leagueId: number): string {
  return LEAGUE_ACCENTS[leagueId % LEAGUE_ACCENTS.length]
}
