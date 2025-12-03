import z from "zod";

export const createUserZodSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
