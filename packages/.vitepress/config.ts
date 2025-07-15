import { defineConfig } from 'vitepress'

import { categoryNames, coreCategoryNames, metadata } from '../metadata/metadata'

import viteConfig from './vite.config'

const Guide = [
  { text: 'はじめに', link: '/guide/' },
  { text: 'VueUseとは', link: '/guide/what-is-vueuse' },
  { text: '環境構築', link: '/guide/setup' },
]

const CoreCategories = coreCategoryNames.map(c => ({
  text: c,
  activeMatch: '___', // never active
  link: `/functions#category=${c}`,
}))

const DefaultSideBar = [
  { text: 'Guide', items: Guide },
  { text: 'Core Functions', items: CoreCategories },
]

const FunctionsSideBar = getFunctionsSideBar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VueYous',
  description: 'Craft Your Own VueUse Composables From Scratch',

  head: [['link', { rel: 'icon', href: '/logo.png' }]],

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    search: { provider: 'local' },
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', items: Guide },
      {
        text: 'Functions',
        items: [
          {
            text: '',
            items: [
              { text: 'All Functions', link: '/functions#' },
            ],
          },
          { text: 'Core', items: CoreCategories },
        ],
      },
    ],

    sidebar: {
      '/guide/': DefaultSideBar,
      '/functions': FunctionsSideBar,
      '/core/': FunctionsSideBar,
      '/shared/': FunctionsSideBar,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/pei-pay/VueYous' }],
  },
  // FIXME: any
  vite: viteConfig as any,
})

function getFunctionsSideBar() {
  const links: any = []

  for (const name of categoryNames) {
    if (name.startsWith('_'))
      continue

    const functions = metadata.functions.filter(i => i.category === name && !i.internal)

    links.push({
      text: name,
      items: functions.map(i => ({
        text: i.name,
        link: i.external || `/${i.package}/${i.name}/`,
      })),
      link: name.startsWith('@')
        ? (functions[0].external || `/${functions[0].package}/README`)
        : undefined,
    })
  }

  return links
}
