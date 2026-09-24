import { MyTeams } from './components/MyTeams'

/**
 * Landing page: the teams the signed-in manager runs.
 *
 * @returns The rendered page.
 */
export function Home() {
  return (
    <div className="d-flex flex-column g-20">
      <h1 className="h3">My teams</h1>
      <MyTeams />
    </div>
  )
}
