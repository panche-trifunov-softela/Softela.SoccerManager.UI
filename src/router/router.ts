import { createBrowserRouter } from 'react-router'

import { AuthorizeRoute } from '@/components/AuthorizeRoute'
import { ManagedClubRoute } from '@/components/ManagedClubRoute'
import { ROUTES } from '@/constants/routes'
import { MainLayout } from '@/layouts/MainLayout'
import { AddTeam } from '@/pages/AddTeam'
import { AvailableTeams } from '@/pages/AvailableTeams'
import { Home } from '@/pages/Home'
import { MyTeamMarketLoanBids } from '@/pages/MyTeamMarketLoanBids'
import { MyTeamMarketSearch } from '@/pages/MyTeamMarketSearch'
import { MyTeamMarketShortlist } from '@/pages/MyTeamMarketShortlist'
import { MyTeamMarketTransferBids } from '@/pages/MyTeamMarketTransferBids'
import { MyTeamNewsFeed } from '@/pages/MyTeamNewsFeed'
import { MyTeamSchedule } from '@/pages/MyTeamSchedule'
import { MyTeamSquad } from '@/pages/MyTeamSquad'
import { MyTeamTactics } from '@/pages/MyTeamTactics'
import { NotFound } from '@/pages/NotFound'
import { Profile } from '@/pages/Profile'
import { Ratings } from '@/pages/Ratings'
import { Settings } from '@/pages/Settings'

/**
 * The application's route tree. `AuthorizeRoute` is a pathless root that
 * admits only a signed-in user; `MainLayout` renders every page below it
 * through its outlet, `ManagedClubRoute` admits the manager-only club pages
 * only for the manager of the club in the address, and the catch-all keeps an
 * unknown URL inside the shell.
 */
export const router = createBrowserRouter([
  {
    Component: AuthorizeRoute,
    children: [
      {
        path: ROUTES.home,
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: ROUTES.profile, Component: Profile },
          { path: ROUTES.settings, Component: Settings },
          // The club pages only its manager may open. Each is reached from a `manager` sidebar
          // entry or a `manager` group's sub-link; the news feed has none yet.
          {
            Component: ManagedClubRoute,
            children: [
              { path: ROUTES.myTeamNewsFeed, Component: MyTeamNewsFeed },
              { path: ROUTES.myTeamTactics, Component: MyTeamTactics },
              { path: ROUTES.myTeamMarketTransferBids, Component: MyTeamMarketTransferBids },
              { path: ROUTES.myTeamMarketLoanBids, Component: MyTeamMarketLoanBids },
              { path: ROUTES.myTeamMarketShortlist, Component: MyTeamMarketShortlist },
              { path: ROUTES.myTeamMarketSearch, Component: MyTeamMarketSearch },
            ],
          },
          { path: ROUTES.myTeamSquad, Component: MyTeamSquad },
          { path: ROUTES.myTeamSchedule, Component: MyTeamSchedule },
          { path: ROUTES.addTeam, Component: AddTeam },
          { path: ROUTES.availableTeams, Component: AvailableTeams },
          { path: ROUTES.ratings, Component: Ratings },
          { path: '*', Component: NotFound },
        ],
      },
    ],
  },
])
