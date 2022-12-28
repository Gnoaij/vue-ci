import type { ServerOptions } from 'vite'
import { loadEnv } from 'vite'

import { MODE } from './index'

import envDir from './envDir'

export default function server(): ServerOptions {
  const _envDir = envDir()

  const { VITE_REQUEST_BASE_URL: prefix } = loadEnv(MODE.DEV, _envDir)
  const { VITE_REQUEST_BASE_URL: target } = loadEnv(MODE.PROD, _envDir)

  return {
    port: 8080,
    open: true,
    proxy: {
      [prefix]: {
        target,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^' + prefix), '')
      }
    }
  }
}
