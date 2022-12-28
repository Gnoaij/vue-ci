import type { PluginOption } from 'vite'
import { splitVendorChunkPlugin } from 'vite'

import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'

import { visualizer } from 'rollup-plugin-visualizer'

import compression from 'vite-plugin-compression'

import { isDev } from './index'

export default function plugins(): PluginOption[] {
  const commonPlugins: PluginOption[] = [
    vue(),
    vueJsx(),
    autoImport({
      include: [/\.[jt]sx?$/, /\.vue$/],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      eslintrc: {
        enabled: true,
        globalsPropValue: 'readonly'
      },
      dts: fileURLToPath(new URL('../types/auto-imports.d.ts', import.meta.url))
    }),
    components({
      resolvers: [
        iconsResolver({
          prefix: 'icon',
          alias: {
            ms: 'material-symbols'
          }
        })
      ],
      dts: fileURLToPath(new URL('../types/components.d.ts', import.meta.url))
    }),
    icons({})
  ]

  return isDev
    ? [...commonPlugins]
    : [
        ...commonPlugins,
        visualizer({
          filename: fileURLToPath(new URL('../build/stats.html', import.meta.url)),
          gzipSize: true,
          brotliSize: true
        }),
        splitVendorChunkPlugin(),
        legacy(),
        compression()
      ]
}
