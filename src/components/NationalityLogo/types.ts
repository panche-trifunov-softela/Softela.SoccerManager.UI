/** What `NationalityLogo` is handed. */
export interface NationalityLogoProps {
  /** The national team's name; `null` when the player has none. */
  name: string | null

  /** The address of the national team's crest; `null` or blank when there is none. */
  logoUrl: string | null
}
