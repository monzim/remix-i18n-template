import { ZodError, ZodSchema } from "zod";

export type ModError<T> = Partial<Record<keyof T, string>>;
export async function zodValidate<Input>({
  request,
  schema,
}: {
  request: Request;
  schema: ZodSchema;
}) {
  const body = Object.fromEntries(await request.formData());
  try {
    const formData = schema.parse(body) as Input;

    return { formData, errors: null };
  } catch (error) {
    console.error(error);
    const err = error as ZodError<Input>;

    return {
      formData: body,
      errors: err.issues.reduce((acc: ModError<Input>, curr) => {
        const key = curr.path[0] as keyof Input;
        acc[key] = curr.message;

        return acc;
      }, {}),
    };
  }
}
