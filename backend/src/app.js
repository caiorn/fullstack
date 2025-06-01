import fastify from 'fastify'
import { userRoutes } from './modules/userSQLite/user-routes.js'

const inProduction = process.env.NODE_ENV === 'production'

export const app = fastify({
	logger: !inProduction
		? {
				level: 'warn', // Mostra apenas mensagens de aviso ou erro
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
