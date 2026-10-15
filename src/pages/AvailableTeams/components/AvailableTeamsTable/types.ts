/** What `AvailableTeamsTable` is handed. */
export interface AvailableTeamsTableProps {
  /** The clubs to show, in order. */
  rows: readonly AvailableTeamRow[]
}

/** One row of the table: a club as the view shows it. */
export interface AvailableTeamRow {
  /** The club's league team id. */
  id: number

  /** The club's name. */
  name: string

  /** The address of the club's logo, or `null` when it has none. */
  logoUrl: string | null

  /** How wealthy the club is, in words. */
  finances: string

  /** Whether the club has a current manager, so it cannot be applied for. */
  isManaged: boolean

  /** Whether the signed-in caller has a pending application for the club. */
  hasPendingApplication: boolean
}

/** What `useAvailableTeamsTable` exposes to the table. */
export interface AvailableTeamsTableState {
  /** The league team id of the club being applied for, or `null` when none is in flight. */
  applyingId: number | null

  /** Why the last application failed, or `null` when none has. */
  error: string | null

  /** Applies for one club, unless an application is already in flight. */
  apply: (row: AvailableTeamRow) => void
}
