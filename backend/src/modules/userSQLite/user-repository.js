// src/modules/users/user.repository.js
import { db } from '../../config/connectionSQLite.js'
import { AppError } from '../../errors/AppError.js'

// helper para iniciar transação
const startTransaction = () => {
	return new Promise((resolve, reject) => {
		db.run('BEGIN TRANSACTION', (err) => {
			if (err) {
				console.error('❌ Failed to start transaction:', err.message)
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

// helper para commitar transação
const commitTransaction = () => {
	return new Promise((resolve, reject) => {
		db.run('COMMIT', (err) => {
			if (err) {
				console.error('❌ Failed to commit transaction:', err.message)
				reject(err)
			} else {
				console.info('✅ Transaction committed successfully.')
				resolve()
			}
		})
	})
}

// helper para rollback de transação
const rollbackTransaction = () => {
	return new Promise((resolve, reject) => {
		db.run('ROLLBACK', (err) => {
			if (err) {
				console.error('❌ Failed to rollback transaction:', err.message)
				reject(err)
			} else {
				console.warn('🔁 Transaction rolled back.')
				resolve()
			}
		})
	})
}

const insertUser = async (user) => {
	const { username, email, senha: hashedPassword } = user

	const insertSQL =
		'INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)'

	try {
		await startTransaction()

		const lastID = await new Promise((resolve, reject) => {
			db.run(insertSQL, [username, email, hashedPassword], function (err) {
				if (err)
					return reject(new Error(err.message || 'Erro desconhecido no banco'))
				resolve(this.lastID)
			})
		})

		await commitTransaction()

		return { id: lastID, username, email }
	} catch (err) {
		await rollbackTransaction()
		throw err
	}
}

// atualiza usuário
const updateUser = async (id, email, password) => {
	const hashedPassword = bcrypt.hashSync(password, 10)
	const updateSQL = 'UPDATE usuarios SET email = ?, senha = ? WHERE id = ?'

	try {
		await startTransaction()
		await new Promise((resolve, reject) => {
			db.run(updateSQL, [email, hashedPassword, id], (err) => {
				if (err) return reject(err)
				resolve()
			})
		})
		await commitTransaction()
	} catch (err) {
		await rollbackTransaction()
		throw new Error(`Erro ao atualizar usuário: ${err.message}`)
	}
}

// deleta usuário
const deleteUser = async (id) => {
	const deleteSQL = 'DELETE FROM usuarios WHERE id = ?'

	try {
		await startTransaction()
		await new Promise((resolve, reject) => {
			db.run(deleteSQL, [id], (err) => {
				if (err) return reject(err)
				resolve()
			})
		})
		await commitTransaction()
	} catch (err) {
		await rollbackTransaction()
		throw new Error(`Erro ao deletar usuário: ${err.message}`)
	}
}

// busca todos os usuários
const getAllUsers = async () => {
	const selectSQL = 'SELECT * FROM usuarios'
	return new Promise((resolve, reject) => {
		db.all(selectSQL, (err, rows) => {
			if (err) return reject(err)
			resolve(rows)
		})
	})
}

// busca usuário por ID
const getUserById = async (id) => {
	const selectSQL = 'SELECT * FROM usuarios WHERE id = ?'
	return new Promise((resolve, reject) => {
		db.get(selectSQL, [id], (err, row) => {
			if (err) return reject(err)
			resolve(row || null)
		})
	})
}

// Função para buscar um usuário pelo email ou username
const getUserByEmailOrUsername = async (email, username) => {
	const selectSQL = `
	  SELECT * FROM usuarios 
	  WHERE email = ? OR username = ?
	`
	return new Promise((resolve, reject) => {
		db.get(selectSQL, [email, username], (err, row) => {
			if (err) {
				console.error(
					'❌ erro ao consultar usuário por email ou username:',
					err.message
				)
				reject(new Error('Erro ao buscar usuário por email ou username'))
			} else if (row) {
				resolve(row)
			} else {
				resolve(null) // Retorna null se não encontrar o usuário
			}
		})
	})
}

export {
	insertUser,
	updateUser,
	deleteUser,
	getAllUsers,
	getUserById,
	getUserByEmailOrUsername
}
