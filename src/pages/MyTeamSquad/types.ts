import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

/** One finished read, kept with the club it was made for. */
export interface MyTeamSquadRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The players read, empty when the read failed. */
  players: readonly LeagueTeamSquadMemberDto[]

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null
}

/** What `useMyTeamSquad` exposes to the page. */
export interface MyTeamSquadState {
  /**
   * The club and its game world, for example `Bayer Leverkusen – Elite Managers`, or `null` while
   * the manager's clubs or the visited club's profile are not read yet, and when either could not
   * be read.
   */
  subtitle: string | null

  /** The squad to show, in the API's order. */
  players: readonly LeagueTeamSquadMemberDto[]

  /** What shows instead of the table, or `null` when the table shows players. */
  message: string | null
}
