import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { ScheduleTable } from './components/ScheduleTable'
import { useMyTeamSchedule } from './useMyTeamSchedule'

/**
 * The schedule of one club: every match it plays in its League's latest season, finished and
 * upcoming, earliest first, open to every signed-in user.
 *
 * - An address with no valid id shows that the club could not be found.
 * - While the schedule loads, when it could not be read and when it is empty, a short fixed
 *   sentence shows in place of the table.
 * - A failure to read is also toasted.
 *
 * @returns The rendered page.
 */
export function MyTeamSchedule() {
  const { subtitle, rows, message } = useMyTeamSchedule()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title="Schedule"
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel="Back to my teams"
      />

      {message === null ? <ScheduleTable rows={rows} /> : <p className="label">{message}</p>}
    </div>
  )
}
