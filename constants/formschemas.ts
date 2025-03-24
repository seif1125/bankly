    import { z } from 'zod'
    import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const loginSchema = z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    })
export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),

    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),

    country: z
      .string()
      .min(1, { message: "Country is required" }),

      mobile: z
      .string()
      .refine((val) => {
        const phone = parsePhoneNumberFromString(val || '')
        return phone?.isValid()
      }, {
        message: 'Invalid mobile number',
      }),

    email: z
      .string()
      .email({ message: "Enter a valid email" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),

    confirmPassword: z.string(),

    dateOfBirth: z
    .preprocess((val) => {
      if (typeof val === 'string' || val instanceof Date) {
        const parsedDate = new Date(val);
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
      }
      return undefined;
    }, z
      .date({ required_error: 'Date of birth is required' })
      .refine((date) => {
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        const isOldEnough = age > 18 || (age === 18 && now >= new Date(date.setFullYear(date.getFullYear() + 18)));
        return isOldEnough;
      }, {
        message: 'You must be at least 18 years old',
      })
    ),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })