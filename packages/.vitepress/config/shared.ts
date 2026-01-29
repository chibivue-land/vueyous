import type { DefaultTheme, UserConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export const sharedConfig: UserConfig<DefaultTheme.Config> = {
  title: "VueYous",
  description: "Craft Your Own VueUse Composables From Scratch",
  base: "/vueyous/",

  head: [["link", { rel: "icon", href: "/logo.png" }]],

  themeConfig: {
    search: { provider: "local" },
    logo: "/logo.png",
    socialLinks: [{ icon: "github", link: "https://github.com/chibivue-land/vueyous" }],
  },
} as const;
