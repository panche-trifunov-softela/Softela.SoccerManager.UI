import { MyTeamCard } from './components/MyTeamCard'
import { useMyTeams } from './useMyTeams'

import styles from './MyTeams.module.scss'

/**
 * The clubs the signed-in manager runs, one card per league and club.
 *
 * @returns The rendered grid, or what stands in for it while the read is in
 * flight, failed, or came back empty.
 */
export function MyTeams() {
  const { teams, isLoading, error, isEmpty } = useMyTeams()

  if (isLoading) return <p className="label">Loading your clubs…</p>

  if (error !== null) return <p className="label">{error}</p>

  if (isEmpty) return <p className="label">You are not managing a club yet.</p>

  return (
    <div className={styles.grid}>
      {teams.map((team) => (
        <MyTeamCard key={team.id} team={team} />
      ))}
    </div>
  )
}
