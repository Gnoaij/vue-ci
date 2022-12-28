import type { BuildOptions } from 'vite'

export default function build(): BuildOptions {
  return {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: ({ name }) => {
          let dir = 'assets'
          if (!name) {
            return `${dir}/[name].[hash].[ext]`
          }
          if (/\.css$/i.test(name)) {
            dir = 'css'
          } else if (/\.(png|jpe?g|gif|svg)$/i.test(name)) {
            dir = 'img'
          } else if (/\.(eot|otf|ttf|woff2?)$/i.test(name)) {
            dir = 'font'
          } else if (/\.(mp3|mp4|webm|ogg|wav|flac|aac)$/i.test(name)) {
            dir = 'media'
          }
          return `${dir}/[name].[hash].[ext]`
        }
        // manualChunks: (id) => {
        //   const match = /\/node_modules\/\.pnpm\/([^/]+)\//.exec(id)
        //   if (match) {
        //     const [, modules] = match
        //     return modules
        //   }
        // }
      }
    }
  }
}
