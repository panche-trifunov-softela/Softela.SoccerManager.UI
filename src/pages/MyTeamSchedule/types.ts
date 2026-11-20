import type { LeagueTeamScheduleMatchDto } from '@/types/leagueTeamScheduleMatchDto'

import type { ScheduleRow } from './components/ScheduleTable'

/** One finished read, kept with the club it was made for. */
export interface MyTeamScheduleRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The matches read, empty when the read failed. */
  matches: readonly LeagueTeamScheduleMatchDto[]

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null
}

/** What `useMyTeamSchedule` exposes to the page. */
export interface MyTeamScheduleState {
  /**
   * The club and its League, for example `Bayer Leverkusen – Elite Managers`, or `null` while the
   * manager's clubs or the visited club's profile are not read yet, and when either could not be
   * read.
   */
  subtitle: string | null

  /** The matches to show, earliest first. */
  rows: readonly ScheduleRow[]

  /** What shows instead of the table, or `null` when the table shows matches. */
  message: string | null
}
