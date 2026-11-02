/**
 * A formation as `GET /api/formations` returns it.
 *
 * Mirrors `FormationDto` on the backend. The two timestamps arrive as UTC ISO strings ending in
 * `Z`.
 */
export interface FormationDto {
  /** The identifier of the formation. */
  id: number

  /** The name of the formation. */
  name: string

  /** When the formation was created, as a UTC ISO string. */
  createdAt: string

  /** When it was last modified, as a UTC ISO string. */
  modifiedAt: string
}
