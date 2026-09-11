import { createBrowserRouter } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

/**
 * The application's route tree. `MainLayout` is the root layout route, so
 * every page renders inside it through its outlet; the catch-all child keeps
 * an unknown URL inside the same shell instead of a blank screen.
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: '*', Component: NotFound },
    ],
  },
])
