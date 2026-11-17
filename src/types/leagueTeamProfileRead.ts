import type { LeagueTeamProfileDto } from './leagueTeamProfileDto'

/** One read of a club's profile, as the profile store holds it for that club. */
export interface LeagueTeamProfileRead {
  /** The club's profile, or `null` until the read resolves and when it failed or found nothing. */
  profile: LeagueTeamProfileDto | null

  /** Whether the read is still in flight. */
  isLoading: boolean

  /** The fixed line to show when the read failed, or `null` when it did not. */
  error: string | null

  /** Whether the API answered that no such club exists. */
  isNotFound: boolean
}
