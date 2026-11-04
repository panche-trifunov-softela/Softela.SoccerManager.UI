import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { Bench } from './components/Bench'
import { LineupSquadList } from './components/LineupSquadList'
import { LineupToolbar } from './components/LineupToolbar'
import { NextMatchHeader } from './components/NextMatchHeader'
import { Pitch } from './components/Pitch'
import { TeamInstructions } from './components/TeamInstructions'
import { useMyTeamTactics } from './useMyTeamTactics'

import styles from './MyTeamTactics.module.scss'

/**
 * The tactics of one club the signed-in manager runs: its next match and the lineup for it, on a
 * pitch with the bench under it and the team instructions under that, and the squad beside it,
 * edited by tapping a slot and then a slot or a player. Every change is saved at once.
 *
 * - An address with no valid id shows that the club could not be found.
 * - While the data loads, when it could not be read (a refusal to a caller who does not manage
 *   the club included), and when there is no match or no formation to edit, a short fixed
 *   sentence shows in place of the board.
 * - A failure to read is also toasted.
 *
 * @returns The rendered page.
 */
export function MyTeamTactics() {
  const { subtitle, view } = useMyTeamTactics()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title="Tactics"
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel="Back to my teams"
      />

      {view.kind === 'message' ? (
        <p className="label">{view.message}</p>
      ) : (
        <div className={styles.board}>
          <div className={styles.header}>
            <NextMatchHeader {...view.board.header} />
          </div>

          <div className={styles.toolbar}>
            <LineupToolbar {...view.board.toolbar} />
          </div>

          <div className={styles.lineup}>
            <Pitch {...view.board.pitch} />

            <Bench {...view.board.bench} />
          </div>

          <div className={styles.squad}>
            <LineupSquadList {...view.board.squad} />
          </div>

          <div className={styles.instructions}>
            <TeamInstructions {...view.board.instructions} />
          </div>
        </div>
      )}
    </div>
  )
}
