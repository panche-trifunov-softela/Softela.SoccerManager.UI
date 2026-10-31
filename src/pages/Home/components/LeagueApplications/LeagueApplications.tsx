import { HomeSection } from '../HomeSection'

import { AnswerButtons } from './components/AnswerButtons'
import { LeagueApplicationCard } from './components/LeagueApplicationCard'
import { useApplicationAnswers } from './hooks'
import { useLeagueApplications } from './useLeagueApplications'

/**
 * The applications made for clubs in the signed-in manager's leagues: one card per application,
 * with the buttons that accept or reject it.
 *
 * @returns The rendered section, or nothing while the read is in flight and when there is no
 * application to show. How an answer went is put into words in a toast.
 */
export function LeagueApplications() {
  const { applications, error, isHidden, refresh } = useLeagueApplications()

  const { answerButtonsFor } = useApplicationAnswers(applications, refresh)

  if (isHidden) return null

  return (
    <HomeSection title="Applications for clubs in your league">
      {error !== null ? (
        <p className="label">{error}</p>
      ) : (
        <div className="card-grid">
          {applications.map((application) => (
            <LeagueApplicationCard
              key={application.id}
              application={application}
              actions={<AnswerButtons {...answerButtonsFor(application)} />}
            />
          ))}
        </div>
      )}
    </HomeSection>
  )
}
