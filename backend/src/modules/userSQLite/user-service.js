import * as userRepository from './user-repository.js'
import bcrypt from 'bcrypt'
import { AppError } from '../../errors/AppError.js'

const validateUserData = (user) => {
	const { username, email, senha } = user
	if (!username || !email || !senha) {
		throw new Error('Username, email, and password are required')
	}
	if (!email.includes('@')) {
		throw new Error('Invalid email format')
	}
	if (senha.length < 6) {
		throw new Error('Password must be at least 6 characters long')
	}
}

const userExists = async (email, username) => {
	const existingUser = await userRepository.getUserByEmailOrUsername(
		email,
		username
	)
	return existingUser
}

export const getAllUsersService = async () => {
	try {
		const users = await userRepository.getAllUsers()
		if (!users) throw new Error('No users found')
		return users
	} catch (error) {
		throw new Error(`Error fetching users from the database: ${error.message}`)
	}
}

export const getUserByIdService = async (id) => {
	try {
		const user = await userRepository.getUserById(id)
		if (!user) throw new Error('User not found')
		return user
	} catch (error) {
		throw new Error(`Error fetching user by ID: ${error.message}`)
	}
}

export const createUserService = async (validatedUser) => {
	const { username, email, senha } = validatedUser

	// verifica se o usuário já existe no banco
	if (await userExists(email, username)) {
		throw new AppError('Já existe um usuário com este username ou e-mail', 409)
	}
	const hashedPassword = bcrypt.hashSync(senha, 10)
	const newUser = await userRepository.insertUser({
		username,
		email,
		senha: hashedPassword
	})
	if (!newUser) throw new AppError('Error inserting user into the database')
	return newUser
}

export const updateUserService = async (id, user) => {
	try {
		// Valida os dados antes de atualizar
		validateUserData(user)

		// Verifica se o usuário existe
		const existingUser = await userRepository.getUserById(id)
		if (!existingUser) throw new Error('User not found')

		const result = await userRepository.updateUser(id, user)
		if (result.changes === 0) throw new Error('No user updated')
		return result
	} catch (error) {
		throw new Error(`Error updating user: ${error.message}`)
	}
}

export const deleteUserService = async (id) => {
	try {
		const existingUser = await userRepository.getUserById(id)
		if (!existingUser) throw new Error('User not found')

		const result = await userRepository.deleteUser(id)
		if (result.changes === 0) throw new Error('No user deleted')
		return result
	} catch (error) {
		throw new Error(`Error deleting user: ${error.message}`)
	}
}
