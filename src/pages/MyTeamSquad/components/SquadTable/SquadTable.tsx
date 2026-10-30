import { PlayerPhoto } from '@/components/PlayerPhoto'
import { MISSING } from '@/constants/missing'

import { NationalityLogo } from './components/NationalityLogo'
import { useSquadTable } from './useSquadTable'

import styles from './SquadTable.module.scss'

import type { SquadTableProps } from './types'

/**
 * One club's squad: a row per player from their photo to their rating, with their squad number,
 * position, age, nationality, value, weekly wage, morale and condition.
 *
 * The narrower the screen, the fewer columns show: the smallest keeps the photo, name and
 * rating, a medium one adds value, wage, morale and condition, and a wide one shows them all.
 *
 * @param props The squad to show, in order.
 * @returns The rendered table.
 */
export function SquadTable({ players }: SquadTableProps) {
  const { rows } = useSquadTable(players)

  return (
    <div className="card">
      <table className={`table ${styles.table}`} aria-label="Squad">
        <thead>
          <tr>
            <th scope="col" className={styles.photo}>
              <span className="visually-hidden">Photo</span>
            </th>

            <th scope="col" className={`label h6 ${styles.number}`}>
              <span aria-hidden="true">#</span>
              <span className="visually-hidden">Squad number</span>
            </th>

            <th scope="col" className="label h6">
              Name
            </th>

            <th scope="col" className={`label h6 ${styles.position}`}>
              Position
            </th>

            <th scope="col" className={`label h6 ${styles.age}`}>
              Age
            </th>

            <th scope="col" className={styles.nationality}>
              <span className="visually-hidden">Nationality</span>
            </th>

            <th scope="col" className={`label h6 ${styles.value}`}>
              Value
            </th>

            <th scope="col" className={`label h6 ${styles.wage}`}>
              Wage
            </th>

            <th scope="col" className={`label h6 ${styles.morale}`}>
              Morale
            </th>

            <th scope="col" className={`label h6 ${styles.condition}`}>
              Condition
            </th>

            <th scope="col" className={`label h6 ${styles.rating}`}>
              Rating
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={styles.photo}>
                <PlayerPhoto imageUrl={row.imageUrl} />
              </td>

              <td className={`text-12 ${styles.number}`}>{row.squadNumber}</td>

              <td>
                <span className="h4 text-overflow d-block">{row.name}</span>
              </td>

              <td className={`text-12 text-overflow ${styles.position}`}>
                <abbr title={row.positionName}>{row.positionShortName}</abbr>
              </td>

              <td className={`text-12 ${styles.age}`}>{row.age}</td>

              <td className={styles.nationality}>
                <NationalityLogo name={row.nationality} logoUrl={row.nationalityLogoUrl} />
              </td>

              <td className={`text-12 ${styles.value}`}>{row.value}</td>

              <td className={`text-12 ${styles.wage}`}>{row.wage}</td>

              <td className={`text-12 text-overflow ${styles.morale}`}>{row.morale}</td>

              <td className={`text-12 ${styles.condition}`}>{row.condition}</td>

              <td className={styles.rating}>
                {row.rating === null ? (
                  MISSING
                ) : (
                  <span className="tag tag--accent tag--inline">{row.rating}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
