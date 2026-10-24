import { useEffect, useSyncExternalStore } from 'react'

import { myTeams, myTeamsStore } from '@/store/myTeams'

import type { MyTeamsRead } from '@/types/myTeamsRead'

/**
 * Reads the clubs the signed-in manager currently runs from the shared my-teams store, and
 * starts the store's read the first time any component asks for it.
 *
 * @returns The latest read: the teams, whether the read is in flight, and the fixed line for a
 * failed read.
 */
export function useMyLeagueTeams(): MyTeamsRead {
  const read = useSyncExternalStore(myTeamsStore.subscribe, myTeamsStore.getSnapshot)

  useEffect(() => {
    myTeams.load()
  }, [])

  return read
}
