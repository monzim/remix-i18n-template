import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { i18nNS } from "~/i18n/i18n";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = { i18n: i18nNS.home };
export default function Index() {
  const { t, i18n } = useTranslation(i18nNS.home);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Authenticaton Test</h1>
      <h1>{t("title")}</h1>

      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("es")}>Spanish</button>
    </div>
  );
}
