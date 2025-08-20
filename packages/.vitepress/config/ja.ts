import type { i18nTheme } from '.'

const nav: i18nTheme['nav'] = [
  { text: 'Home', link: '/ja/' },
  { text: 'Guide', link: '/ja/guide/' },
]

const sidebar: i18nTheme['sidebar'] = [
  { text: 'はじめに', link: '/ja/guide/' },
  { text: 'VueUseとは', link: '/ja/guide/what-is-vueuse' },
  { text: 'VueUseの構成', link: '/ja/guide/vueuse-architecture' },
  { text: '環境構築', link: '/ja/guide/setup' },
  { text: '貢献', link: '/ja/guide/contributing' },
]

export const ja: i18nTheme = { nav, sidebar }
