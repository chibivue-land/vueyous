import type { DefaultTheme, UserConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export const sharedConfig: UserConfig<DefaultTheme.Config> = {
  title: "VueYous",
  description: "Craft Your Own VueUse Composables From Scratch",

  head: [["link", { rel: "icon", href: "/logo.png" }]],

  themeConfig: {
    search: { provider: "local" },
    logo: "/logo.png",
    socialLinks: [{ icon: "github", link: "https://github.com/pei-pay/VueYous" }],
  },
} as const;
