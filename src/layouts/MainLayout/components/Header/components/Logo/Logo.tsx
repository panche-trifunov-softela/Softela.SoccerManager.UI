import { NavLink } from 'react-router'

import logo from '@/assets/images/logo.png'
import { ROUTES } from '@/constants/routes'

import styles from './Logo.module.scss'

import type { LogoProps } from './types'

/**
 * The application's wordmark, linking back to the landing page.
 *
 * @param props The component's props.
 * @returns The rendered logo link.
 */
export function Logo({ size = 'md' }: LogoProps) {
  return (
    <NavLink className={`${styles.logo} ${styles[size]}`} to={ROUTES.home}>
      <img className={styles.logo_image} src={logo} alt="" />
      Soccer Manager
    </NavLink>
  )
}
