import { env } from './env.js'
import { createSqliteAndInsertIfNotExist } from './config/create-sqlite-db.js'
import { testarConexao } from './config/connectionMySql.js'
import { app } from './app.js'

app.listen({ port: env.PORT, host: env.HOST }).then(async () => {
	console.info('🟢 Server running!')

	await testarConexao()

	// criando uma base para testes
	createSqliteAndInsertIfNotExist()
})
