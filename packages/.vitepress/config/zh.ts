import type { i18nTheme } from ".";

const nav: i18nTheme["nav"] = [
  { text: "首页", link: "/zh/" },
  { text: "指南", link: "/zh/guide/" },
];

const sidebar: i18nTheme["sidebar"] = [
  {
    text: "Chapter 0: 简介",
    collapsed: false,
    items: [
      { text: "简介", link: "/zh/guide/" },
      { text: "VueUse 是什么？", link: "/zh/guide/what-is-vueuse" },
      { text: "设置开发环境", link: "/zh/guide/setting-up" },
    ],
  },
  {
    text: "Chapter 1: State（状态管理）",
    collapsed: false,
    items: [
      { text: "概述", link: "/zh/guide/state/" },
      { text: "useCounter", link: "/zh/guide/state/useCounter" },
    ],
  },
];

export const zh: i18nTheme = { nav, sidebar };
