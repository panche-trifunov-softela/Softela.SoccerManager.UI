/**
 * Routes for every backend controller the frontend calls, grouped by
 * controller. Casing follows the backend exactly; each one is a path appended
 * to the configured base URL.
 */
export const API_ROUTES = {
  formations: {
    /** Every formation. */
    list: '/api/formations',
  },
  leagueTeamManagers: {
    /** The signed-in caller's own appointments. */
    mine: '/api/league-team-managers/mine',
  },
  leagueTeamManagerApplications: {
    /** Applies, as the signed-in caller, to manage one club; takes a `POST`. */
    create: '/api/league-team-manager-applications',

    /** The signed-in caller's own pending applications that can still be accepted. */
    mine: '/api/league-team-manager-applications/mine',

    /** The applications made for clubs in the signed-in caller's leagues. */
    incoming: '/api/league-team-manager-applications/incoming',

    /**
     * One application, by its id; a `PUT` answers it, accepting or rejecting it, when the
     * signed-in caller owns its league or is an operator.
     */
    byId: (id: number) => `/api/league-team-manager-applications/${id}`,
  },
  leagueTeams: {
    /**
     * Every club on one league's roster, with whether each has a current manager and whether the
     * caller has applied for it; `?leagueId=` picks the league.
     */
    available: '/api/league-teams/available',

    /** One league team's squad, ordered by line, position, rating and name. */
    players: (id: number) => `/api/league-teams/${id}/players`,

    /**
     * One league team's names and its league, by the club's id; any signed-in caller may read it.
     */
    profile: (id: number) => `/api/league-teams/${id}/profile`,

    /**
     * One league team's squad with each player's contract, morale and condition, in the same order
     * as `players`; only the club's current manager, a current manager of another club in its
     * league, or an operator may read it.
     */
    squad: (id: number) => `/api/league-teams/${id}/squad`,

    /**
     * One league team's next match with its lineup; only the club's current manager or an operator
     * may read it, and the API answers 204 with no body when the club has no match to come.
     */
    nextMatch: (id: number) => `/api/league-teams/${id}/next-match`,

    /**
     * One player as the club's league has them, by the club's id and the player's id: the
     * club's own registration, or else one at another club of the same league; only the club's
     * current manager or an operator may read it.
     */
    leaguePlayer: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}`,

    /**
     * One player's transfers into clubs of the club's league, newest first, by the club's id and
     * the player's id; only the club's current manager or an operator may read them.
     */
    leaguePlayerTransfers: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/transfers`,

    /**
     * One player's injuries in the club's league, newest first, by the club's id and the
     * player's id; only the club's current manager or an operator may read them.
     */
    leaguePlayerInjuries: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/injuries`,

    /**
     * The players, registered or free agents, and the clubs of the club's league whose names
     * contain `?searchTerm=`, the best five of each with the totals, by the club's id; only the
     * club's current manager or an operator may read them.
     */
    search: (id: number) => `/api/league-teams/${id}/search`,

    /**
     * The pending transfer and loan bids for one player, newest first, by the id of the club
     * holding the player and the player's id; only that club's current manager or an operator may
     * read them.
     */
    leaguePlayerBids: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/bids`,

    /**
     * The clubs with a bid on one player, accepted deals first and then newest first, by the
     * ACTING club's id and the player's id; any manager of that league may read them. It says who
     * has bid, never the terms.
     */
    leaguePlayerBidders: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/bidders`,

    /**
     * The transfer bids a club places for a player registered at another club, by the BIDDING
     * club's id and the player's id; takes a `POST`.
     */
    leaguePlayerTransferBids: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/transfer-bids`,

    /**
     * One transfer bid for a player, by the id of the club holding the player, the player's id and
     * the bid's id; a `PUT` answers it, accepting or rejecting it, when the caller manages the
     * club holding the player or is an operator.
     */
    leaguePlayerTransferBidById: (id: number, playerId: number, bidId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/transfer-bids/${bidId}`,

    /**
     * The loan bids a club places for a player registered at another club, by the BIDDING club's
     * id and the player's id; takes a `POST`.
     */
    leaguePlayerLoanBids: (id: number, playerId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/loan-bids`,

    /**
     * One loan bid for a player, by the id of the club holding the player, the player's id and the
     * bid's id; a `PUT` answers it, accepting or rejecting it, when the caller manages the club
     * holding the player or is an operator.
     */
    leaguePlayerLoanBidById: (id: number, playerId: number, bidId: number) =>
      `/api/league-teams/${id}/league-players/${playerId}/loan-bids/${bidId}`,
  },
  leagues: {
    /** The leagues the signed-in caller does not manage a club in; `?searchTerm=` narrows them by name. */
    list: '/api/leagues',
  },
  managerPlayerRatingVotes: {
    /** Votes, as the signed-in caller, on one player's current rating; takes a `POST`. */
    create: '/api/manager-player-rating-votes',

    /**
     * One vote, by its id; a `PUT` changes its direction and a `DELETE` withdraws it, when it is the
     * signed-in caller's own.
     */
    byId: (id: number) => `/api/manager-player-rating-votes/${id}`,
  },
  managers: {
    /** The signed-in caller's own manager profile; a `POST` creates it when it is missing. */
    me: '/api/managers/me',
  },
  matches: {
    /**
     * One match's lineup for a club, by the match's id; a `PUT` changes its formation, one slot,
     * or both.
     */
    lineup: (id: number) => `/api/matches/${id}/lineup`,

    /** Replaces one match's lineup for a club with an automatically picked one; takes a `POST`. */
    autoPick: (id: number) => `/api/matches/${id}/lineup/auto-pick`,

    /**
     * One match's instructions for a club, by the match's id; a `PUT` changes one or more of the
     * seven.
     */
    instructions: (id: number) => `/api/matches/${id}/instructions`,

    /** The instructions a club gives for a match, each with its choices, for the page to offer. */
    instructionOptions: '/api/matches/instruction-options',

    /**
     * One match's substitutions for a club, by the match's id: a `GET` with `?leagueTeamId=` lists
     * them, and a `DELETE` with `?leagueTeamId=&minuteAt=&situation=` removes one.
     */
    substitutions: (id: number) => `/api/matches/${id}/substitutions`,

    /**
     * One match's substitution lineup for a club, by the match's id; a `PUT` changes its formation,
     * one slot, or both.
     */
    substitutionLineup: (id: number) => `/api/matches/${id}/substitutions/lineup`,

    /**
     * One match's substitution instructions for a club, by the match's id; a `PUT` changes one or
     * more of the seven.
     */
    substitutionInstructions: (id: number) => `/api/matches/${id}/substitutions/instructions`,

    /**
     * The minutes and the situations a club picks a substitution by, each with its choices, for the
     * page to offer.
     */
    substitutionOptions: '/api/matches/substitution-options',
  },
  players: {
    /** Searches the players; every query parameter narrows, sorts or pages the result. */
    search: '/api/players/search',

    /** One player's profile, by the player's id: their own record, with their positions. */
    profile: (id: number) => `/api/players/${id}/profile`,
  },
  positions: {
    /** Every position, ordered by name. */
    list: '/api/positions',
  },
  teams: {
    /** Every team, ordered by name. */
    list: '/api/teams',
  },
  nationalTeams: {
    /** Every national team, ordered by name. */
    list: '/api/national-teams',
  },
} as const
