/** What `PlayerHeader` is handed: a player's header, with every text already written. */
export interface PlayerHeaderProps {
  /** The address of the player's photo; `null` or blank when there is none. */
  imageUrl: string | null

  /** The name of the player's club, or `null` when they have none. */
  clubName: string | null

  /** The address of that club's crest, or `null` when it has none. */
  clubLogoUrl: string | null

  /** The name of the player's national team, or `null` when they have none. */
  nationality: string | null

  /** The address of that national team's crest, or `null` when it has none. */
  nationalityLogoUrl: string | null

  /** The date of birth with the age, for example `14 Mar 1998 (28)`. */
  birth: string

  /** The main position, for example `Centre-Back (CB)`, or the missing-value mark when there is none. */
  position: string

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** The player's value, written in euros in the reader's locale. */
  value: string

  /** The player's wage, written in euros in the reader's locale. */
  wage: string

  /** How long the contract has to run, for example `2 seasons left`, or `null` when none is shown. */
  contract: string | null

  /** The player's shirt number, or `null` when none is shown. */
  squadNumber: number | null
}
