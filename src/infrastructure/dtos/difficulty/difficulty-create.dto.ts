import { z } from 'zod'

export const DifficultyCreateDTO = z.object({
  hex_code: z.string().min(3, 'Código hex inválido'),
  name: z.string(),
  xp_reward: z.number(),
  ambicoins_reward: z.number(),
})
