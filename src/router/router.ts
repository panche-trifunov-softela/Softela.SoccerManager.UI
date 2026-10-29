import { createBrowserRouter } from 'react-router'

import { AuthorizeRoute } from '@/components/AuthorizeRoute'
import { ROUTES } from '@/constants/routes'
import { MainLayout } from '@/layouts/MainLayout'
import { AddTeam } from '@/pages/AddTeam'
import { AvailableTeams } from '@/pages/AvailableTeams'
import { Home } from '@/pages/Home'
import { MyTeamNewsFeed } from '@/pages/MyTeamNewsFeed'
import { MyTeamSquad } from '@/pages/MyTeamSquad'
import { NotFound } from '@/pages/NotFound'
import { Profile } from '@/pages/Profile'
import { Ratings } from '@/pages/Ratings'
import { Settings } from '@/pages/Settings'

/**
 * The application's route tree. `AuthorizeRoute` is a pathless root that
 * admits only a signed-in user; `MainLayout` renders every page below it
 * through its outlet, and the catch-all keeps an unknown URL inside the shell.
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
          { path: ROUTES.myTeamNewsFeed, Component: MyTeamNewsFeed },
          { path: ROUTES.myTeamSquad, Component: MyTeamSquad },
          { path: ROUTES.addTeam, Component: AddTeam },
          { path: ROUTES.availableTeams, Component: AvailableTeams },
          { path: ROUTES.ratings, Component: Ratings },
          { path: '*', Component: NotFound },
        ],
      },
    ],
  },
])
