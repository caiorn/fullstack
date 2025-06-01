import { env } from './env.js'
import { createSqliteAndInsertIfNotExist } from './config/create-sqlite-db.js'
import { testarConexao } from './config/connectionMySql.js'
import { app } from './app.js'
import { createServer as createHttpServer } from 'node:http'
import { configureSocketIO } from './socket.js'

const httpServer = createHttpServer(app.server)
configureSocketIO(httpServer)

// app.listen({ port: env.PORT, host: env.HOST }).then(async () => {
httpServer.listen(env.PORT, env.HOST, async () => {
	console.info(`🟢 Server running at http://${env.HOST}:${env.PORT}`)
	await testarConexao()
	// criando uma base para testes
	//createSqliteAndInsertIfNotExist();
})
