/** What `useMyTeamMarketSearch` exposes to the page. */
export interface MyTeamMarketSearchState {
  /** The club id in the address, or `null` when the address holds no valid id. */
  leagueTeamId: number | null

  /** The club's name and game world, or `null` until the address's club is one the user runs. */
  subtitle: string | null
}
