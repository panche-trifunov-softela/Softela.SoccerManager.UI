import { useEffect, useState } from 'react'

import { toPlayerHeader } from '@/components/PlayerHeader'
import { toPositionsPitch } from '@/components/PositionsPitch'
import { getPlayerProfile, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { PROFILE_LOAD_FAILED_MESSAGE, PROFILE_LOADING_MESSAGE } from './constants'

import type { PlayerProfileRead, PlayerProfileState } from './types'

/**
 * Reads one player's profile from the players table and works out what the panel shows.
 *
 * - Each finished read is kept with the player it was made for, and a read made for another player
 *   counts as still loading. State is written only when a read settles.
 * - A failure to read says why in a toast, and the panel says the player could not be loaded. A
 *   read that was aborted says nothing.
 *
 * @param playerId The player whose profile is read.
 * @returns The header's and the pitch's props, or the sentence to show in their place.
 */
export function usePlayerProfile(playerId: number): PlayerProfileState {
  const [read, setRead] = useState<PlayerProfileRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getPlayerProfile(playerId, controller.signal)
      .then((profile) => {
        setRead({ playerId, profile, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, PROFILE_LOAD_FAILED_MESSAGE))

        setRead({ playerId, profile: null, error: PROFILE_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [playerId])

  const current = read !== null && read.playerId === playerId ? read : null

  if (current === null) {
    return { header: null, pitch: null, message: PROFILE_LOADING_MESSAGE }
  }

  if (current.profile === null) {
    return { header: null, pitch: null, message: current.error }
  }

  return {
    header: toPlayerHeader(current.profile, new Date()),
    pitch: toPositionsPitch(current.profile.positions),
    message: null,
  }
}
