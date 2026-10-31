import { toApplicantName } from './toApplicantName'

import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

/**
 * Names an application by who made it and the club it is for.
 *
 * @param application The application to name.
 * @returns The phrase naming it, such as `Jane Doe's application for Bayer Leverkusen`, or
 * `the application for Bayer Leverkusen` when the applicant's name is not known.
 */
export function toApplicationName(application: IncomingLeagueTeamManagerApplicationDto): string {
  const applicantName = toApplicantName(application)

  if (applicantName === null) return `the application for ${application.teamName}`

  return `${applicantName}'s application for ${application.teamName}`
}
