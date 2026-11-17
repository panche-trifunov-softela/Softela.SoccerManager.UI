import styles from './SearchGroup.module.scss'

import type { SearchGroupProps } from './types'

/**
 * One group of the search results: a heading that names the group, with how many of how many
 * matches are listed when the group is cut, and its options under it. The group is named by its
 * heading, and the count is left out of that name, since the live region says it.
 *
 * @param props The id and text of the heading, the count text if any, and the options.
 * @returns The rendered group.
 */
export function SearchGroup({ headingId, heading, countText, children }: SearchGroupProps) {
  return (
    <ul role="group" aria-labelledby={headingId} className={styles.group}>
      <li role="presentation" id={headingId} className={styles.heading}>
        <span className="label h6">{heading}</span>

        {countText !== null && (
          <span aria-hidden="true" className="text-12">
            {countText}
          </span>
        )}
      </li>

      {children}
    </ul>
  )
}
