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
}
