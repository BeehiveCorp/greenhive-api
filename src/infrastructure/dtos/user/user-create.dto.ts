import { z } from 'zod'

export const UserCreateDTO = z.object({
  email: z.string().email('O e-mail precisa ser válido'),
  password: z.string().min(8, 'A senha precisa ter ao menos 8 caracteres'),
  name: z.string().min(2, 'Seu nome precisa ter mais de 2 letras'),
  username: z.string().min(2, 'Necessário username'),
})
