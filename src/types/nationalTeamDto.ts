/**
 * A national team as the API returns it.
 *
 * Mirrors `NationalTeamDto` on the backend. The two timestamps arrive as UTC
 * ISO strings.
 */
export interface NationalTeamDto {
  /** The identifier of the national team. */
  id: number

  /** The name of the national team. */
  name: string

  /** The identifier of the national team's stadium, or `null` when it has none. */
  stadiumId: number | null

  /** The URL of the national team's jersey image, or `null` when it has none. */
  jerseyUrl: string | null

  /** The URL of the national team's logo image, or `null` when it has none. */
  logoUrl: string | null

  /** The national team's Transfermarkt identifier, or `null` when it has none. */
  transfermarktId: number | null

  /** When the national team was created, as a UTC ISO string. */
  createdAt: string

  /** When it was last modified, as a UTC ISO string. */
  modifiedAt: string
}
