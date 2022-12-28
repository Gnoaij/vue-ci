import { defineConfig } from 'vite'

import { MODE, generateConfig } from './vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => generateConfig(mode as MODE))
