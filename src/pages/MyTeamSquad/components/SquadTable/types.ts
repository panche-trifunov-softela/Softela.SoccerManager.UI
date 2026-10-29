import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

/** What `SquadTable` is handed. */
export interface SquadTableProps {
  /** The squad to show, in order. */
  players: readonly LeagueTeamSquadMemberDto[]
}

/** One row of the squad table: a player as the view shows them. */
export interface SquadMemberRow {
  /** The squad entry's id, unique per row. */
  id: number

  /** The player's shirt number in this squad. */
  squadNumber: number

  /** The player's name. */
  name: string

  /** The address of the player's photo; `null` or blank when they have none. */
  imageUrl: string | null

  /** The full name of the player's main position, shown on hover. */
  positionName: string

  /** The short name of that position, for example `CB`, as the table shows it. */
  positionShortName: string

  /** The player's age in completed years. */
  age: number

  /** The name of the player's national team, or `null` when they have none. */
  nationality: string | null

  /** The address of that national team's crest, or `null` when there is none. */
  nationalityLogoUrl: string | null

  /** The in-game transfer value, written in euros in the reader's locale. */
  value: string

  /** The weekly wage, written the same way. */
  wage: string

  /** The player's morale, in words. */
  morale: string

  /** The player's condition as a percentage, for example `87%`. */
  condition: string

  /** The player's current rating, or `null` when they have none. */
  rating: number | null
}

/** What `useSquadTable` exposes to the view. */
export interface SquadTableState {
  /** The rows to show, in the API's order. */
  rows: readonly SquadMemberRow[]
}
