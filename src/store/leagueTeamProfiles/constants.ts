import type { LeagueTeamProfileRead } from '@/types/leagueTeamProfileRead'

/** The line a failed read keeps, and what its toast says when the API gave no reason. */
export const LEAGUE_TEAM_PROFILE_LOAD_FAILED_MESSAGE = 'This club could not be loaded.'

/** What the store holds before any club has been read. */
export const NO_PROFILES: Readonly<Record<number, LeagueTeamProfileRead>> = {}

/**
 * What a club's entry is while its read is in flight, and what a club with no entry yet counts as,
 * because its read starts as soon as a consumer mounts.
 */
export const PROFILE_LOADING: LeagueTeamProfileRead = {
  profile: null,
  isLoading: true,
  error: null,
  isNotFound: false,
}
