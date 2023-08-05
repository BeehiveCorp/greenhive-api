import fastify from 'fastify'

const app = fastify()

app.get('/test', async () => {
  return { emptyArr: [] }
})

app.listen({
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
  host: '0.0.0.0',
})
