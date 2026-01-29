import type { i18nTheme } from ".";

const nav: i18nTheme["nav"] = [
  { text: "Home", link: "/ja/" },
  { text: "Guide", link: "/ja/guide/" },
];

const sidebar: i18nTheme["sidebar"] = [
  { text: "はじめに", link: "/ja/guide/" },
  { text: "VueUseとは", link: "/ja/guide/what-is-vueuse" },
];

export const ja: i18nTheme = { nav, sidebar };
