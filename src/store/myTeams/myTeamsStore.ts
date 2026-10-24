import { getMyLeagueTeamManagers, toErrorMessage } from '@/services/api'
import { createStore } from '@/store/createStore'
import { toast } from '@/store/toast'

import { CURRENT_ONLY, LOADING, MY_TEAMS_LOAD_FAILED_MESSAGE } from './constants'

import type { MyTeamsRead } from '@/types/myTeamsRead'
import type { ReadableStore } from '@/types/readableStore'

/** The latest read of the caller's clubs. It is replaced, never mutated, whenever it changes. */
const store = createStore<MyTeamsRead>(LOADING)

/** Whether a read is in flight or has already succeeded, so `load` has nothing to start. */
let isStarted = false

/**
 * The my-teams subscription surface, shaped for `useSyncExternalStore`.
 */
export const myTeamsStore: ReadableStore<MyTeamsRead> = store

/**
 * The call that fills the store. It is a plain function that reads no React state.
 */
export const myTeams = {
  /**
   * Starts reading the clubs the signed-in manager currently runs, once per page load.
   *
   * - Does nothing while a read is in flight or after one has succeeded, so every caller shares
   *   one request.
   * - A failed read raises an error toast with the reason and keeps the fixed line as the error;
   *   the next call retries it.
   *
   * @returns Nothing.
   */
  load(): void {
    if (isStarted) return

    isStarted = true

    // A retry after a failed read shows the loading state again, not the stale error line.
    if (store.getSnapshot() !== LOADING) store.set(LOADING)

    void getMyLeagueTeamManagers(CURRENT_ONLY).then(
      (teams) => {
        store.set({ teams, isLoading: false, error: null })
      },
      (cause: unknown) => {
        isStarted = false

        toast.error(toErrorMessage(cause, MY_TEAMS_LOAD_FAILED_MESSAGE))

        // The toast carries the reason; the read keeps only the fixed line in place of the clubs.
        store.set({ teams: [], isLoading: false, error: MY_TEAMS_LOAD_FAILED_MESSAGE })
      },
    )
  },
}
