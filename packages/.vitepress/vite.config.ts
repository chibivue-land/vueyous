import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

import { MarkdownTransform } from './plugins/markdownTransform'

export default defineConfig({
  server: {
    fs: {
      allow: [
        resolve(__dirname, '..'),
      ],
    },
  },
  plugins: [
    // custom
    MarkdownTransform(),
    // plugins
    Components({
      dirs: resolve(__dirname, 'theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: resolve(__dirname, 'components.d.ts'),
      transformer: 'vue3',
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@vueyous/shared': resolve(__dirname, '../shared/index.ts'),
      '@vueyous/core': resolve(__dirname, '../core/index.ts'),
      '@vueyous/metadata': resolve(__dirname, '../metadata/index.ts'),
    },
    dedupe: ['vue'],
  },
})
