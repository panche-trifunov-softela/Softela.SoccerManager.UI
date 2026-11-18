import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { CLUB_PLACEHOLDER_MESSAGE } from './constants'
import { useClubPlaceholderPage } from './useClubPlaceholderPage'

import type { ClubPlaceholderPageProps } from './types'

/**
 * The shell of a club page that has no content yet: its heading, the club under it, and a line
 * saying the page is coming soon. An address with no valid club id shows the heading and the line
 * with no subtitle.
 *
 * @param props The page's heading.
 * @returns The rendered page.
 */
export function ClubPlaceholderPage({ title }: ClubPlaceholderPageProps) {
  const { subtitle } = useClubPlaceholderPage()

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title={title}
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel="Back to my teams"
      />

      <p className="label">{CLUB_PLACEHOLDER_MESSAGE}</p>
    </div>
  )
}
