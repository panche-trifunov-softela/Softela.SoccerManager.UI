import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { TACTICS_COMING_SOON_MESSAGE } from './constants'
import { useMyTeamTactics } from './useMyTeamTactics'

/**
 * The tactics of one club the signed-in manager runs. For now a placeholder: the title bar, as on
 * the squad page, and a line saying the tactics are coming.
 *
 * @returns The rendered page.
 */
export function MyTeamTactics() {
  const { subtitle } = useMyTeamTactics()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title="Tactics"
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel="Back to my teams"
      />

      <p className="label">{TACTICS_COMING_SOON_MESSAGE}</p>
    </div>
  )
}
