import { categoryNames, coreCategoryNames, metadata } from '../../metadata/metadata'
import type { i18nTheme } from '.'

const Guide = [
  { text: 'はじめに', link: '/ja/guide/' },
  { text: 'VueUseとは', link: '/ja/guide/what-is-vueuse' },
  { text: '環境構築', link: '/ja/guide/setup' },
  { text: '貢献', link: '/ja/guide/contributing' },
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

const nav: i18nTheme['nav'] = [
  { text: 'Home', link: '/ja/' },
  { text: 'Guide', link: '/ja/guide/' },
  { text: 'Functions', link: 'ja/functions' },
]

const sidebar: i18nTheme['sidebar'] = {
  'ja/guide/': DefaultSideBar,
  'ja/functions': FunctionsSideBar,
  // TODO: ja
  'ja/core/': FunctionsSideBar,
  'ja/shared/': FunctionsSideBar,
}

export const ja: i18nTheme = { nav, sidebar }

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
