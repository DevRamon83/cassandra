import { endpoints } from "../constants/atomics.ts";
import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(3, { message: "tooShort" })
    .max(20, { message: "tooLong" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "invalidChars" }),
  psw: z
    .string()
    .min(8, { message: "tooShort" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "AtLeastLowercase",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "AtLeastUppercase",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "AtLeastNum",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "AtLeastSpecial",
    }),
  endpoint: z.string().refine((val) => endpoints.includes(val), {
    message: "noEndpoint",
  }),
});
