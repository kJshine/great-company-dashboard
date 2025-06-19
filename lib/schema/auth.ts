import * as z from "zod";

import { AUTH_CONSTANTS, AUTH_MESSAGE, AUTH_REGEX } from "@/lib/constants";

export const baseFormSchema = z.object({
  email: z
    .string()
    .nonempty(AUTH_MESSAGE.EMAIL_REQUIRED)
    .email(AUTH_MESSAGE.EMAIL_INVALID),
  password: z.string().nonempty(AUTH_MESSAGE.PASSWORD_REQUIRED),
});

export const loginFormSchema = baseFormSchema;

export const signupFormSchema = baseFormSchema
  .extend({
    password: baseFormSchema.shape.password
      .min(
        AUTH_CONSTANTS.MIN_PASSWORD_LENGTH,
        AUTH_MESSAGE.PASSWORD_MUST_HAVING
      )
      .refine((password) => {
        const specialCharRegex = AUTH_REGEX.SPECIAL_CHAR;
        return specialCharRegex.test(password);
      }, AUTH_MESSAGE.PASSWORD_SPECIAL_CHARACTER),
    accountType: z.enum(
      [
        AUTH_CONSTANTS.ACCOUNT_TYPES.PERSONAL,
        AUTH_CONSTANTS.ACCOUNT_TYPES.COMPANY,
      ],
      {
        required_error: AUTH_MESSAGE.ACCOUNT_TYPE_REQUIRED,
      }
    ),
    companyName: z.string().optional(),
    numberOfEmployee: z.coerce.number().optional(),
    dob: z.date().refine((date) => {
      const today = new Date();
      const eightedYearAgo = new Date(
        today.getFullYear() - AUTH_CONSTANTS.MIN_AGE,
        today.getMonth(),
        today.getDate()
      );
      return date <= eightedYearAgo;
    }, AUTH_MESSAGE.AGE_RESTRICTION),
    passwordConfirm: z.string(),
    acceptTerm: z
      .boolean()
      .refine((checked) => checked, AUTH_MESSAGE.TERMS_REQUIRED),
  })
  .superRefine((data, ctx) => {
    if (
      data.accountType === AUTH_CONSTANTS.ACCOUNT_TYPES.COMPANY &&
      !data.companyName
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: AUTH_MESSAGE.COMPANY_NAME_REQUIRED,
      });
    }

    if (
      data.accountType === AUTH_CONSTANTS.ACCOUNT_TYPES.COMPANY &&
      (!data.numberOfEmployee || data.numberOfEmployee < 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numberOfEmployee"],
        message: AUTH_MESSAGE.EMPLOYEE_COUNT_REQUIRED,
      });
    }

    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: AUTH_MESSAGE.PASSWORD_MISMATCH,
      });
    }
  });
