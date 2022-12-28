import type { ResolveOptions, AliasOptions } from 'vite'

import { fileURLToPath, URL } from 'node:url'

export default function resolve(): ResolveOptions & {
  alias?: AliasOptions
} {
  return {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url))
    }
  }
}
