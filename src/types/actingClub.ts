import type { LeagueTeamProfileDto } from './leagueTeamProfileDto'

/** The club the signed-in manager acts as on the current page, as `useActingClub` resolves it. */
export interface ActingClub {
  /**
   * The league team id of the club the manager acts as: the address's club when they run it,
   * otherwise their club in that club's league, or `null` when the page has no such club, it is
   * not known yet, or the manager runs no club there.
   */
  actingClubId: number | null

  /**
   * The address's club when the manager does not run it and its profile is read, otherwise
   * `null`. It is also `null` while their clubs load and after they failed to load.
   */
  visitedClub: LeagueTeamProfileDto | null
}
