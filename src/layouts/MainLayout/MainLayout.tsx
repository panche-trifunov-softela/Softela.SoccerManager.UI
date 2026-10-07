import { Outlet } from 'react-router'

import { Header } from './components/Header'

/**
 * The shell every routed page renders inside: the header and an outlet for
 * the active page.
 *
 * @returns The rendered layout with the current route's page in its outlet.
 */
export function MainLayout() {
  return (
    <>
      <Header />

      <main className="page_container">
        <Outlet />
      </main>
    </>
  )
}
