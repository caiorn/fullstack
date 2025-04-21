/* este arquivo irá criar base apenas para testes, voce pode utilizar a extenção SQLiteView para visualizar os dados direto do vscode */

import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'
import fs from 'node:fs'
import path from 'node:path'
import { env } from '../env.js'

// cria ou abre o banco de dados e insere usuários se ainda não existirem
export function createSqliteAndInsertIfNotExist() {
	// resolve o caminho absoluto do banco de dados usando a variável de ambiente
	const dbPath = path.resolve(env.SQLITE_DB_PATH)

	// garante que a pasta do banco de dados exista
	fs.mkdirSync(path.dirname(dbPath), { recursive: true })

	// abre ou cria o banco de dados sqlite no caminho especificado
	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			console.error('❌ erro ao conectar ao banco de dados:', err.message)
			return
		}
		console.info('🟢 conexão com o banco de dados estabelecida com sucesso.')
	})

	// executa as operações em série garantindo a ordem
	db.serialize(() => {
		// cria a tabela "usuarios" se ainda não existir
		const createTable = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      );
    `

		db.run(createTable, (err) => {
			if (err) {
				console.error('❌ erro ao criar a tabela:', err.message)
				return
			}
			console.info('🟢 tabela "usuarios" pronta.')

			// define os usuários de exemplo para inserção
			const usuarios = [
				{ username: 'alice', email: 'alice@example.com', senha: '1234' },
				{ username: 'bob', email: 'bob@example.com', senha: 'admin' },
				{ username: 'charlie', email: 'charlie@example.com', senha: '1' }
			]

			// prepara a instrução de inserção com ignorar duplicatas
			const insert = db.prepare(
				'INSERT OR IGNORE INTO usuarios (username, email, senha) VALUES (?, ?, ?)'
			)

			// insere cada usuário com a senha criptografada
			for (const usuario of usuarios) {
				const hash = bcrypt.hashSync(usuario.senha, 10)
				insert.run(usuario.username, usuario.email, hash)
			}

			// finaliza a instrução preparada
			insert.finalize((err) => {
				if (err) {
					console.error('❌ erro ao finalizar inserções:', err.message)
					return
				}

				// consulta todos os usuários após as inserções
				db.all('SELECT * FROM usuarios', (err, rows) => {
					if (err) {
						console.error('❌ erro ao consultar usuários:', err.message)
					} else {
						console.table(rows)
					}

					// fecha o banco de dados após as consultas
					db.close((err) => {
						if (err) {
							console.error('❌ erro ao fechar o banco de dados:', err.message)
						}
					})
				})
			})
		})
	})
}
