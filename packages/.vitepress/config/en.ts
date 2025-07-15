import { categoryNames, coreCategoryNames, metadata } from '../../metadata/metadata'
import type { i18nTheme } from '.'

const Guide = [
  { text: 'Getting Started', link: '/guide/' },
  { text: 'What is VueUse?', link: '/guide/what-is-vueuse' },
  { text: 'Setup', link: '/guide/setup' },
  { text: 'Contributing', link: '/guide/contributing' },
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
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide/' },
  { text: 'Functions', link: '/functions' },
]

const sidebar: i18nTheme['sidebar'] = {
  '/guide/': DefaultSideBar,
  '/functions': FunctionsSideBar,
  '/core/': FunctionsSideBar,
  '/shared/': FunctionsSideBar,
}

export const en: i18nTheme = { nav, sidebar }

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
