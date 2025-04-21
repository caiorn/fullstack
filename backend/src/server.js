import fastify from 'fastify'
import { env } from './env.js'
import { createSqliteAndInsertIfNotExist } from './config/create-sqlite-db.js'
import { userRoutes } from './modules/user/user-routes.js'

const inProduction = process.env.NODE_ENV === 'production'

const app = fastify({
	logger: !inProduction
		? {
				level: 'debug',
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						translateTime: 'HH:MM:ss',
						ignore: 'pid,hostname'
					}
				}
			}
		: false // remove em produção
})
app.register(userRoutes, { prefix: 'users' })

app.get('/', () => {
	return 'Hello World'
})

app.listen({ port: env.PORT }).then(() => {
	console.info('🟢 Server running!')

	// criando uma base para testes
	createSqliteAndInsertIfNotExist()
})
