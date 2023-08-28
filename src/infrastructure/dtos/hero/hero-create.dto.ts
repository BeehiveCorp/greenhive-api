import { z } from 'zod'

export const HeroCreateDTO = z.object({
  name: z.string().min(3, 'O personagem precisa ter ao menos 3 caracteres'),
  description: z
    .string()
    .min(16, 'A descrição do personagem precisa ter ao menos 16 caracteres'),
  lore: z
    .string()
    .min(16, 'A lore do personagem precisa ter ao menos 16 caracteres'),
  file: z.unknown(),
})
