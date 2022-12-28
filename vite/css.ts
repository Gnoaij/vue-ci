import type { CSSOptions } from 'vite'

export default function css(): CSSOptions {
  return {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/styles/_/mixins' as Mixins;
          @use '@/styles/_/themes' as Themes;
        `
      }
    }
  }
}
