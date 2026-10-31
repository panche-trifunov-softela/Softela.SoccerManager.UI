import styles from './HomeSection.module.scss'

import type { HomeSectionProps } from './types'

/**
 * One section of the landing page: a title row, then the content.
 *
 * - The title looks like an `h3` whatever its heading level.
 * - From lg the title row is as tall as a button, so sections side by side start their content
 *   at the same height.
 *
 * @param props The title, its heading level, the title row's action, and the content.
 * @returns The rendered section.
 */
export function HomeSection({ title, titleAs: Title = 'h2', action, children }: HomeSectionProps) {
  return (
    <section className="d-flex flex-column g-20">
      <div className={`d-flex align-items-center justify-content-between g-20 ${styles.header}`}>
        <Title className="h3">{title}</Title>

        {action}
      </div>

      {children}
    </section>
  )
}
