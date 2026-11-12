/** The player an opener asks the profile panel to show. */
export interface PlayerProfileTarget {
  /** The identifier of the player. */
  playerId: number

  /** The name of the player, which becomes the panel's title. */
  name: string
}
