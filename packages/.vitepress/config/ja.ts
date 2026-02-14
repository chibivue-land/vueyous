import type { i18nTheme } from ".";

const nav: i18nTheme["nav"] = [
  { text: "Home", link: "/ja/" },
  { text: "Guide", link: "/ja/guide/" },
];

const sidebar: i18nTheme["sidebar"] = [
  {
    text: "Chapter 0: イントロダクション",
    collapsed: false,
    items: [
      { text: "はじめに", link: "/ja/guide/" },
      { text: "VueUseとは", link: "/ja/guide/what-is-vueuse" },
      { text: "開発環境のセットアップ", link: "/ja/guide/setting-up" },
    ],
  },
  {
    text: "Chapter 1: State（状態管理）",
    collapsed: false,
    items: [
      { text: "概要", link: "/ja/guide/state/" },
      { text: "useCounter", link: "/ja/guide/state/useCounter" },
    ],
  },
];

export const ja: i18nTheme = { nav, sidebar };
