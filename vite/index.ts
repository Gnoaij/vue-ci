import type { UserConfig } from 'vite'

import resolve from './resolve'
import envDir from './envDir'
import css from './css'
import plugins from './plugins'
import server from './server'
import build from './build'

export enum MODE {
  DEV = 'development',
  PROD = 'production'
}

export let isDev = true

export function generateConfig(mode: MODE): UserConfig {
  isDev = mode === MODE.DEV

  const commonConfig: UserConfig = {
    resolve: resolve(),
    envDir: envDir(),
    css: css(),
    plugins: plugins()
  }

  return isDev
    ? {
        ...commonConfig,
        server: server()
      }
    : {
        ...commonConfig,
        build: build()
      }
}
