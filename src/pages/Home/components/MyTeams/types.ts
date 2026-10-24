import type { MyTeamsRead } from '@/types/myTeamsRead'

/** What `useMyTeams` exposes to the view: the store's read, plus whether it found nothing. */
export interface MyTeamsState extends MyTeamsRead {
  /** Whether the read succeeded and found nothing. */
  isEmpty: boolean
}
