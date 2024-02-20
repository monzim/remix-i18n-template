import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { zodValidate } from "~/lib/utils/zod";

const registerSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters")
    .max(100),
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

export type Input = z.infer<typeof registerSchema>;
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

export default function Signup() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
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
          <em>{actionData?.errors.password}</em>
        ) : null}
      </p>

      <button type="submit">Register</button>
    </Form>
  );
}
