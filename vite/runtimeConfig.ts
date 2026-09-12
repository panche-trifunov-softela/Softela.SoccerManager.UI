import { createReadStream, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

import type { Plugin } from 'vite'

/** The shipped runtime config, relative to the public directory. */
const SHIPPED_FILE = 'config.js'

/** The per-machine override, relative to the public directory. */
const DEVELOPMENT_FILE = 'config.development.js'

/**
 * Keeps runtime configuration per machine without touching the shipped file.
 *
 * Flow:
 * 1. On the dev server, a request for `/config.js` is answered with
 *    `public/config.development.js` whenever that file exists.
 * 2. The file in use is named once the server is listening.
 * 3. After a build, the per-machine file is removed from the output directory,
 *    since Vite copies everything under `public/` into it.
 *
 * @returns The Vite plugin.
 */
export function runtimeConfig(): Plugin {
  let publicDir = ''
  let outDir = ''

  return {
    name: 'runtime-config',

    configResolved(config) {
      publicDir = config.publicDir
      outDir = resolve(config.root, config.build.outDir)
    },

    configureServer(server) {
      const developmentFile = resolve(publicDir, DEVELOPMENT_FILE)

      server.httpServer?.once('listening', () => {
        const inUse = existsSync(developmentFile) ? DEVELOPMENT_FILE : SHIPPED_FILE

        server.config.logger.info(`  runtime config: public/${inUse}`)
      })

      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]

        if (path !== `/${SHIPPED_FILE}` || !existsSync(developmentFile)) {
          next()
          return
        }

        res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')
        createReadStream(developmentFile).pipe(res)
      })
    },

    closeBundle() {
      rmSync(resolve(outDir, DEVELOPMENT_FILE), { force: true })
    },
  }
}
