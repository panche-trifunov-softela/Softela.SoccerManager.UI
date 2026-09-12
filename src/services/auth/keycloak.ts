import Keycloak from 'keycloak-js'

import { appConfig } from '@/config'

/** The one Keycloak adapter instance: created here, initialised by `initAuth`. */
export const keycloak = new Keycloak(appConfig.keycloak)
