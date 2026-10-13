import type { FinancialState } from './financialState'

/**
 * A team as the API returns it.
 *
 * Mirrors `TeamDto` on the backend. The two timestamps arrive as UTC ISO
 * strings.
 */
export interface TeamDto {
  /** The identifier of the team. */
  id: number

  /** The name of the team. */
  name: string

  /** The identifier of the team's stadium, or `null` when it has none. */
  stadiumId: number | null

  /** The team's overall financial standing. */
  financialState: FinancialState

  /** The URL of the team's jersey image, or `null` when it has none. */
  jerseyUrl: string | null

  /** The URL of the team's logo image, or `null` when it has none. */
  logoUrl: string | null

  /** The team's Transfermarkt identifier, or `null` when it has none. */
  transfermarktId: number | null

  /** When the team was created, as a UTC ISO string. */
  createdAt: string

  /** When it was last modified, as a UTC ISO string. */
  modifiedAt: string
}
