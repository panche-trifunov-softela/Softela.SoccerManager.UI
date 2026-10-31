import type { IncomingLeagueTeamManagerApplicationDto } from '@/types/incomingLeagueTeamManagerApplicationDto'

/**
 * Reads the name of the manager who made an application, ready to show.
 *
 * - The name is trimmed.
 * - A name that is `null` or blank counts as not known.
 *
 * @param application The application whose applicant is named.
 * @returns The applicant's name, or `null` when it is not known.
 */
export function toApplicantName(
  application: IncomingLeagueTeamManagerApplicationDto,
): string | null {
  return application.managerName?.trim() || null
}
