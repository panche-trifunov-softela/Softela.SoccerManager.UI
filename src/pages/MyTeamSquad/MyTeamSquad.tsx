import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { SquadTable } from './components/SquadTable'
import { useMyTeamSquad } from './useMyTeamSquad'

/**
 * The squad of one club the signed-in manager runs, in one game world: one row per player with
 * their contract, morale and condition there.
 *
 * - An address with no valid id shows that the club could not be found.
 * - While the squad loads, when it could not be read (a refusal to a caller who does not manage
 *   the club included) and when it is empty, a short fixed sentence shows in place of the table.
 * - A failure to read is also toasted.
 *
 * @returns The rendered page.
 */
export function MyTeamSquad() {
  const { subtitle, players, message } = useMyTeamSquad()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title="Squad"
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel="Back to my teams"
      />

      {message === null ? <SquadTable players={players} /> : <p className="label">{message}</p>}
    </div>
  )
}
