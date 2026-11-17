import type { TeamSquadTarget } from './teamSquadTarget'

/** What `useOpenTeamSquad` gives a page. */
export interface TeamSquadOpener {
  /** Opens the club's squad in the side panel. */
  openTeamSquad: (target: TeamSquadTarget) => void
}
