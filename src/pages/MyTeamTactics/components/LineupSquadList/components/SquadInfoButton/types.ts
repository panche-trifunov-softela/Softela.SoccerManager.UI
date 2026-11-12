/** What `SquadInfoButton` is handed. */
export interface SquadInfoButtonProps {
  /** The id of the player the button opens. */
  playerId: number

  /** The player's name, which names the button. */
  name: string

  /** Called with the player's id and name when the button is pressed. */
  onInfo: (playerId: number, name: string) => void
}
