import jwt from 'jsonwebtoken'

export const generateJwtToken = (userId: string) => {
  const payload = {
    userId,
    timestamp: Date.now(),
  }

  return jwt.sign(payload, String(process.env.JWT_SECRET_KEY), {
    expiresIn: '1d',
  })
}
