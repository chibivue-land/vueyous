import type { i18nTheme } from ".";

const nav: i18nTheme["nav"] = [
  { text: "Home", link: "/ja/" },
  { text: "Guide", link: "/ja/guide/" },
];

const sidebar: i18nTheme["sidebar"] = [
  { text: "はじめに", link: "/ja/guide/" },
  { text: "VueUseとは", link: "/ja/guide/what-is-vueuse" },
  { text: "開発環境のセットアップ", link: "/ja/guide/setting-up" },
];

export const ja: i18nTheme = { nav, sidebar };
