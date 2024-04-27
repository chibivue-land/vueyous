import type { i18nTheme } from '.'

const nav: i18nTheme['nav'] = [
  { text: '首页', link: '/zh/' },
  { text: '指南', link: '/zh/guide/' },
]

const sidebar: i18nTheme['sidebar'] = [
  { text: '快速开始', link: '/zh/guide/' },
  { text: 'VueUse 是什么？', link: '/zh/guide/what-is-vueuse' },
  { text: '初始化', link: '/zh/guide/setup' },
]

export const zh: i18nTheme = { nav, sidebar }
