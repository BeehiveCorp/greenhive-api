import jwt from 'jsonwebtoken'

export const generateJwtToken = (userId: string) => {
  return jwt.sign({ userId }, String(process.env.JWT_SECRET_KEY), {
    expiresIn: 60,
  })
}
