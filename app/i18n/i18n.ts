export type SupportedLanguages = "en" | "es";
export const defaultLanguage: SupportedLanguages = "en";
export const supportedLanguages: SupportedLanguages[] = ["en", "es"];

export const i10nConfig = {
  defaultLanguage,
  supportedLanguages,
};

export const i18nNS = {
  home: "home",
  common: "common",
};

export function getSuggestedLanguage(
  language?: string
): SupportedLanguages | undefined {
  if (supportedLanguages.includes(language as SupportedLanguages)) {
    return language as SupportedLanguages;
  }

  return undefined;
}

export default {
  supportedLngs: supportedLanguages,
  fallbackLng: defaultLanguage,
  defaultNS: i18nNS.common,
  react: { useSuspense: false },
};
