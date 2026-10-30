/** What `useMyTeamTactics` exposes to the page. */
export interface MyTeamTacticsState {
  /**
   * The club and its game world, for example `Bayer Leverkusen – Elite Managers`, or `null` when
   * the signed-in manager does not run the club or their clubs are not read yet.
   */
  subtitle: string | null
}
