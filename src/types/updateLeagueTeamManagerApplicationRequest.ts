import type { ApplicationStatus } from './applicationStatus'

/**
 * The body of `PUT /api/league-team-manager-applications/{id}`. It answers one pending
 * application, by accepting or rejecting it.
 */
export interface UpdateLeagueTeamManagerApplicationRequest {
  /** The identifier of the application to answer. */
  id: number

  /** `2` accepts the application and `3` rejects it; the API refuses any other value. */
  status: ApplicationStatus
}
