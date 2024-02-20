import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { i18nNS } from "~/i18n/i18n";
import { zodValidate } from "~/lib/utils/zod";

const registerSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters")
    .max(100),
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "passMinLength"),
});

type Input = z.infer<typeof registerSchema>;

export async function action({ request }: ActionFunctionArgs) {
  const { formData, errors } = await zodValidate<Input>({
    request: request,
    schema: registerSchema,
  });

  console.log("🚀 ~ action ~ formData:", formData);

  if (errors) {
    return json({ errors }, { status: 400 });
  }

  return redirect("/dashboard");
}

export const handle = { i18n: i18nNS.home };
export default function Signup() {
  const actionData = useActionData<typeof action>();
  const { t, i18n } = useTranslation(i18nNS.home);

  return (
    <Form method="post">
      <h1>{t("title")}</h1>
      <p>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" />
        {actionData?.errors?.fullName ? (
          <em>{actionData?.errors.fullName}</em>
        ) : null}
      </p>

      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        {actionData?.errors?.email ? <em>{actionData?.errors.email}</em> : null}
      </p>

      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        {actionData?.errors?.password ? (
          <em>{t(actionData?.errors.password)}</em>
        ) : null}
      </p>

      <button type="submit">Register</button>
      <button type="button" onClick={() => i18n.changeLanguage("en")}>
        English
      </button>
      <button type="button" onClick={() => i18n.changeLanguage("es")}>
        Spanish
      </button>
    </Form>
  );
}
