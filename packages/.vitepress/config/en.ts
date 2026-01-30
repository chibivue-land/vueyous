import type { i18nTheme } from ".";

const nav: i18nTheme["nav"] = [
  { text: "Home", link: "/" },
  { text: "Guide", link: "/guide/" },
];

const sidebar: i18nTheme["sidebar"] = [
  { text: "Getting Started", link: "/guide/" },
  { text: "What is VueUse?", link: "/guide/what-is-vueuse" },
  { text: "Setting Up", link: "/guide/setting-up" },
];

export const en: i18nTheme = { nav, sidebar };
