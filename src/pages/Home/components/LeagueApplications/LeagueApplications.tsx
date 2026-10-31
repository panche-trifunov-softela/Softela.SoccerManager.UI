import { HomeSection } from '../HomeSection'

import { LeagueApplicationCard } from './components/LeagueApplicationCard'
import { useLeagueApplications } from './useLeagueApplications'

/**
 * The applications made for clubs in the signed-in manager's leagues, one card per application.
 *
 * @returns The rendered section, or nothing while the read is in flight and when there is no
 * application to show.
 */
export function LeagueApplications() {
  const { applications, error, isHidden } = useLeagueApplications()

  if (isHidden) return null

  return (
    <HomeSection title="Applications for clubs in your league">
      {error !== null ? (
        <p className="label">{error}</p>
      ) : (
        <div className="card-grid">
          {applications.map((application) => (
            <LeagueApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </HomeSection>
  )
}
