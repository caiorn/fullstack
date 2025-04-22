import mysql from 'mysql2/promise'
import { env } from '../env.js'

const pool = mysql.createPool(
	env.DB_URL || {
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASS,
		database: env.DB_NAME
	}
)

async function testarConexao() {
	const connection = await pool.getConnection()
	try {
		console.info('🟢 conexão com o mySql estabelecida com sucesso!')
		connection.release()
	} catch (error) {
		console.info('❌ erro ao conectar com o banco de dados:', error.message)
		process.exit(1) // encerra a aplicação se falhar
	} finally {
		if (connection) {
			connection.release() // libera a conexão após o teste
		}
	}
}

async function executeQuery(sql, params = []) {
	try {
		const [results] = await pool.execute(sql, params)
		if (process.env.NODE_ENV !== 'production') {
			// informa via log tabela e comando executado
			const operation = sql.trim().split(/\s+/)[0].toUpperCase()
			const tableMatch = sql.match(/(?:FROM|INTO|UPDATE|JOIN)\s+`?(\w+)`?/i)
			const table = tableMatch ? tableMatch[1] : 'unknown'
			console.info(`🟢 ${operation} IN ${table}`)
		}
		return results
	} catch (err) {
		console.info(`[SQL ERROR] ${sql} - ${JSON.stringify(params)}`)
		console.info(err.message)
		throw err // repropaga o erro para ser tratado no controller ou middleware
	}
}

// module.exports = pool;
export { pool, testarConexao, executeQuery }
