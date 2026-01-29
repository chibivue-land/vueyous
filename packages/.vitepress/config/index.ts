import type { DefaultTheme, UserConfig } from "vitepress";
import { defineConfig } from "vitepress";
import { en } from "./en";
import { ja } from "./ja";
import { sharedConfig } from "./shared";
import { zh } from "./zh";

export type i18nTheme = Partial<NonNullable<UserConfig<DefaultTheme.Config>["themeConfig"]>>;

export default defineConfig({
  ...sharedConfig,
  themeConfig: sharedConfig.themeConfig,
  locales: {
    root: { label: "English", lang: "en", themeConfig: { ...en } },
    // 🚧 Under construction - uncomment when ready
    // ja: { label: "日本語", lang: "ja", themeConfig: { ...ja } },
    // zh: { label: "简体中文", lang: " zh", themeConfig: { ...zh } },
    // other languages...
  },
});
