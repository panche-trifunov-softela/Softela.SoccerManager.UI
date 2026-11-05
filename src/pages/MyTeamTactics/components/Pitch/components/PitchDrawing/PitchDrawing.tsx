import { GRADIENT_IDS, NEAR_FADE_TOP } from './constants'
import { toPitchPaths } from './utils'

import styles from './PitchDrawing.module.scss'

// Worked out once: the drawing never changes, and the board only stretches it.
const PITCH_PATHS = toPitchPaths()

/**
 * The pitch in perspective, with the team's own goal at the far end: mown bands, grass beyond the
 * lines, the markings, a goal with a net, and a near edge that fades into the page.
 *
 * - It is drawn in percent of the board, the same space the markers are placed in.
 * - It stretches with the board, while its lines keep one width.
 * - It is decorative and hidden from assistive technology.
 *
 * @returns The rendered drawing.
 */
export function PitchDrawing() {
  return (
    <svg
      className={styles.drawing}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient
          id={GRADIENT_IDS.sun}
          gradientUnits="userSpaceOnUse"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(50 52) scale(80 50)"
        >
          <stop offset="0" className={styles.sun_stop} />
          <stop offset="1" className={styles.clear_stop} />
        </radialGradient>

        <linearGradient
          id={GRADIENT_IDS.shade}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="100"
          y2="0"
        >
          <stop offset="0" className={styles.shade_stop} />
          <stop offset="0.22" className={styles.clear_stop} />
          <stop offset="0.78" className={styles.clear_stop} />
          <stop offset="1" className={styles.shade_stop} />
        </linearGradient>

        <linearGradient
          id={GRADIENT_IDS.haze}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="32"
        >
          <stop offset="0" className={styles.haze_stop} />
          <stop offset="1" className={styles.clear_stop} />
        </linearGradient>

        <linearGradient
          id={GRADIENT_IDS.nearFade}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={NEAR_FADE_TOP}
          x2="0"
          y2="100"
        >
          <stop offset="0" className={styles.clear_stop} />
          <stop offset="0.62" className={styles.fade_part_stop} />
          <stop offset="1" className={styles.fade_stop} />
        </linearGradient>
      </defs>

      <path className={styles.band_light} d={PITCH_PATHS.turf} />
      <path className={styles.band_dark} d={PITCH_PATHS.darkBands} />
      <path className={styles.run_off} d={PITCH_PATHS.runOff} />
      <path className={styles.spots} d={PITCH_PATHS.spots} />
      <path className={styles.lines} d={PITCH_PATHS.lines} />
      <path className={styles.sun} d={PITCH_PATHS.turf} fill={`url(#${GRADIENT_IDS.sun})`} />
      <path d={PITCH_PATHS.turf} fill={`url(#${GRADIENT_IDS.shade})`} />
      <path d={PITCH_PATHS.turf} fill={`url(#${GRADIENT_IDS.haze})`} />
      <path className={styles.goal_net} d={PITCH_PATHS.goalNet} />
      <path className={styles.goal_net_lines} d={PITCH_PATHS.goalNetLines} />
      <path className={styles.goal_frame} d={PITCH_PATHS.goalFrame} />
      <rect
        x="0"
        y={NEAR_FADE_TOP}
        width="100"
        height={100 - NEAR_FADE_TOP}
        fill={`url(#${GRADIENT_IDS.nearFade})`}
      />
    </svg>
  )
}
