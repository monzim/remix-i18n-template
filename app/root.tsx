import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import i18next from "~/i18n/i18next.server";
import { getSuggestedLanguage, i18nNS } from "./i18n/i18n";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { lang } = params;

  console.log("🚀 ~ file: root.tsx ~ line 100 ~ loader ~ lang", lang);

  const locale =
    getSuggestedLanguage(lang) ?? (await i18next.getLocale(request));
  return json({ locale });
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const handle = { i18n: i18nNS.common };

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
