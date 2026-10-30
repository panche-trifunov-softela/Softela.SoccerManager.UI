import type { MyLeagueTeamManagerDto } from './myLeagueTeamManagerDto'

/** The club the address selects, as `useSelectedClub` resolves it. */
export interface SelectedClub {
  /**
   * The club id in the address, or `null` when the page has none or it is not a whole number
   * above zero.
   */
  leagueTeamId: number | null

  /**
   * The address's club when it is one the signed-in manager currently runs, otherwise `null`. It is
   * also `null` while their clubs load and after they failed to load.
   */
  club: MyLeagueTeamManagerDto | null

  /**
   * Whether the address names a club but the manager's clubs are still loading, so whether it is
   * theirs is not yet known.
   */
  isPending: boolean
}
