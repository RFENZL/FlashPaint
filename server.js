const fastify = require('fastify')({ logger: true })

// Route de base
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Démarrer le serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log('Server running at http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()