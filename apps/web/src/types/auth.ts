import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').pipe(z.email()),
  password: z.string().trim().min(1, 'Password is required'),
})

export type LoginFormData = z.infer<typeof LoginSchema>
