import { Outlet } from 'react-router'

import { OffCanvasHost } from '@/components/OffCanvasHost'

import { Header } from './components/Header'

/**
 * The shell every routed page renders inside: the header and an outlet for
 * the active page, both wrapped in the host of the right off-canvas panel.
 *
 * @returns The rendered layout with the current route's page in its outlet.
 */
export function MainLayout() {
  return (
    <OffCanvasHost>
      <Header />

      <main className="page_container">
        <Outlet />
      </main>
    </OffCanvasHost>
  )
}
