import { Link } from 'react-router'

import styles from './PageTitle.module.scss'

import type { PageTitleProps } from './types'

/**
 * A page's heading row: a back arrow, the page's heading, and an optional line under it.
 *
 * @param props The heading, the line under it, and where the arrow leads.
 * @returns The rendered heading row.
 */
export function PageTitle({ title, subtitle, backTo, backLabel }: PageTitleProps) {
  return (
    <div className="d-flex align-items-center g-12">
      <Link
        to={backTo}
        className={`icon-btn icon-btn--blue focus-ring ${styles.back}`}
        aria-label={backLabel}
      >
        <i className="icon-arrow-left" aria-hidden="true" />
      </Link>

      <div className={styles.titles}>
        <h1 className="h3">{title}</h1>

        {subtitle ? <p className="label text-12 text-overflow">{subtitle}</p> : null}
      </div>
    </div>
  )
}
