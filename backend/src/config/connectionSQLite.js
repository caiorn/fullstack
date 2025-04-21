import sqlite3 from 'sqlite3'
import { env } from '../env.js'
import fs from 'node:fs'
import path from 'node:path'

// caminho do arquivo do banco (pasta definida na string)
const dbPath = path.resolve(env.SQLITE_DB_PATH)

// garante que a pasta exista
fs.mkdirSync(path.dirname(dbPath), { recursive: true })

// Cria a conexão com o banco SQLite
const db = new sqlite3.Database(env.SQLITE_DB_PATH, (err) => {
	if (err) {
		console.info('❌ erro ao conectar ao banco SQLite:', err.message)
		process.exit(1)
	}
	console.info('conexão com o banco SQLite estabelecida!')
})

// Função para testar a conexão
const testarConexao = () => {
	db.get('SELECT 1', (err) => {
		if (err) {
			console.info(
				'❌ erro ao testar a conexão com o banco SQLite:',
				err.message
			)
			process.exit(1)
		} else {
			console.info('conexão com SQLite testada com sucesso')
		}
	})
}

// Função para fechar a conexão com o banco
const fecharConexao = () => {
	db.close((err) => {
		if (err) {
			console.info(
				'❌ erro ao fechar a conexão com o banco SQLite:',
				err.message
			)
		} else {
			console.info('conexão com SQLite fechada')
		}
	})
}

// Exportando a instância de db e as funções
export { db, testarConexao, fecharConexao }
