import { z } from 'zod'

export const UserSignInDTO = z.object({
  email: z.string(),
  password: z.string(),
})
