import type { i18nTheme } from ".";

const nav: i18nTheme["nav"] = [
  { text: "Home", link: "/" },
  { text: "Guide", link: "/guide/" },
];

const sidebar: i18nTheme["sidebar"] = [
  {
    text: "Chapter 0: Introduction",
    collapsed: false,
    items: [
      { text: "Getting Started", link: "/guide/" },
      { text: "What is VueUse?", link: "/guide/what-is-vueuse" },
      { text: "Setting Up", link: "/guide/setting-up" },
    ],
  },
  {
    text: "Chapter 1: State Management",
    collapsed: false,
    items: [
      { text: "Overview", link: "/guide/state/" },
      { text: "useCounter", link: "/guide/state/useCounter" },
    ],
  },
];

export const en: i18nTheme = { nav, sidebar };
