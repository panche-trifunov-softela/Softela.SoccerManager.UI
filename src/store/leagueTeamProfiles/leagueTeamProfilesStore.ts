import { ApiError, getLeagueTeamProfile, toErrorMessage } from '@/services/api'
import { createStore } from '@/store/createStore'
import { toast } from '@/store/toast'

import {
  LEAGUE_TEAM_PROFILE_LOAD_FAILED_MESSAGE,
  NO_PROFILES,
  PROFILE_LOADING,
} from './constants'

import type { LeagueTeamProfileDto } from '@/types/leagueTeamProfileDto'
import type { LeagueTeamProfileRead } from '@/types/leagueTeamProfileRead'
import type { ReadableStore } from '@/types/readableStore'

/**
 * The latest read of every club asked for, by league team id. It is replaced, never mutated,
 * whenever one entry changes.
 *
 * It is a store, not a page's own read, because the header, the player-profile opener and the
 * squad page, which share no parent, each need the same club's names and league.
 */
const store = createStore<Readonly<Record<number, LeagueTeamProfileRead>>>(NO_PROFILES)

/** The clubs whose read is in flight or settled for good, so `load` has nothing to start. */
const started = new Set<number>()

/**
 * Replaces one club's entry, leaving every other club's as it is.
 *
 * @param leagueTeamId The club whose entry changes.
 * @param read The entry to hold from now on.
 * @returns Nothing.
 */
function setRead(leagueTeamId: number, read: LeagueTeamProfileRead): void {
  store.set({ ...store.getSnapshot(), [leagueTeamId]: read })
}

/**
 * The profile subscription surface, shaped for `useSyncExternalStore`.
 */
export const leagueTeamProfilesStore: ReadableStore<
  Readonly<Record<number, LeagueTeamProfileRead>>
> = store

/**
 * The calls that fill the store. They are plain functions that read no React state.
 */
export const leagueTeamProfiles = {
  /**
   * Starts reading one club's profile, once per page load.
   *
   * - Does nothing while the club's read is in flight, after it has succeeded or found no such
   *   club, and for a club whose profile was handed over with `prime`.
   * - A club the API does not know is final and silent: its entry says so.
   * - Any other failure raises one error toast with the reason and keeps the fixed line as the
   *   entry's error; the next call retries it.
   *
   * @param leagueTeamId The club's league team id.
   * @returns Nothing.
   */
  load(leagueTeamId: number): void {
    if (started.has(leagueTeamId)) return

    started.add(leagueTeamId)

    setRead(leagueTeamId, PROFILE_LOADING)

    void getLeagueTeamProfile(leagueTeamId).then(
      (profile) => {
        setRead(leagueTeamId, { profile, isLoading: false, error: null, isNotFound: false })
      },
      (cause: unknown) => {
        if (cause instanceof ApiError && cause.status === 404) {
          setRead(leagueTeamId, { profile: null, isLoading: false, error: null, isNotFound: true })

          return
        }

        started.delete(leagueTeamId)

        toast.error(toErrorMessage(cause, LEAGUE_TEAM_PROFILE_LOAD_FAILED_MESSAGE))

        // The toast carries the reason; the entry keeps only the fixed line.
        setRead(leagueTeamId, {
          profile: null,
          isLoading: false,
          error: LEAGUE_TEAM_PROFILE_LOAD_FAILED_MESSAGE,
          isNotFound: false,
        })
      },
    )
  },

  /**
   * Hands the store a club's profile the caller already knows, so the page for that club needs no
   * read.
   *
   * @param profile The club's profile.
   * @returns Nothing.
   */
  prime(profile: LeagueTeamProfileDto): void {
    started.add(profile.leagueTeamId)

    setRead(profile.leagueTeamId, { profile, isLoading: false, error: null, isNotFound: false })
  },
}
