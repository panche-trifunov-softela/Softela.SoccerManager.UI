import { AppliedClubCard } from './components/AppliedClubCard'
import { useAppliedClubs } from './useAppliedClubs'

/**
 * The clubs the signed-in manager has applied to, one card per pending application.
 *
 * @returns The rendered section, or nothing while the read is in flight and when there is no
 * application to show.
 */
export function AppliedClubs() {
  const { applications, error, isHidden } = useAppliedClubs()

  if (isHidden) return null

  return (
    <section className="d-flex flex-column g-20">
      <h2 className="h3">Applied clubs</h2>

      {error !== null ? (
        <p className="label">{error}</p>
      ) : (
        <div className="card-grid">
          {applications.map((application) => (
            <AppliedClubCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </section>
  )
}
