/**
 * A league as the API returns it. A league is a game world: the seasons,
 * competitions, squads and appointments of one game all hang off it.
 *
 * Mirrors `LeagueDto` on the backend. The two timestamps arrive as UTC ISO
 * strings.
 */
export interface LeagueDto {
  /** The identifier of the league. */
  id: number

  /** The name of the league. */
  name: string

  /** When the league was created, as a UTC ISO string. */
  createdAt: string

  /** When it was last modified, as a UTC ISO string. */
  modifiedAt: string
}
