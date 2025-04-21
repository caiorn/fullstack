import * as userService from './user-service.js'
import { userSchema } from './user-schema.js'

// GET /users
export const getAllUsersController = async (request, reply) => {
	try {
		const users = await userService.getAllUsersService()
		return reply.code(200).send(users)
	} catch (error) {
		request.log.error(error)
		return reply.code(500).send({ message: 'Erro interno ao buscar usuários.' })
	}
}

// GET /users/:id
export const getUserByIdController = async (request, reply) => {
	const { id } = request.params
	try {
		const user = await userService.getUserByIdService(id)

		if (!user) {
			return reply.code(404).send({ message: 'Usuário não encontrado.' })
		}

		return reply.code(200).send(user)
	} catch (error) {
		request.log.error(error)
		return reply.code(500).send({ message: 'Erro ao buscar usuário.' })
	}
}

// POST /users
export const createUserController = async (request, reply) => {
	// valida e converte a entrada de dados.
	const validatedUser = userSchema.safeParse(request.body)
	if (!validatedUser.success) {
		return reply.status(400).send({
			error: 'Erro de validação',
			issues: validatedUser.error.issues.map((issue) => ({
				campo: issue.path.join('.'),
				mensagem: issue.message
			}))
		})
	}
	try {
		const newUser = await userService.createUserService(validatedUser.data) //safe parse return {sucess|error:..., data:...}
		return reply.code(201).send({
			message: 'Usuário criado com sucesso.',
			user: newUser
		})
	} catch (err) {
		request.log.error(err)
		return reply
			.status(err.statusCode || 500)
			.send(err.message || 'Erro interno no servidor')
	}
}

// PUT /users/:id
export const updateUserController = async (request, reply) => {
	const { id } = request.params
	const updates = request.body
	try {
		const updatedUser = await userService.updateUserService(id, updates)
		return reply.code(200).send({
			message: 'Usuário atualizado com sucesso.',
			user: updatedUser
		})
	} catch (error) {
		request.log.error(error)
		return reply.code(400).send({ message: error.message })
	}
}

//  DELETE /users/:id
export const deleteUserController = async (request, reply) => {
	const { id } = request.params
	try {
		await userService.deleteUserService(id)
		return reply.code(200).send({ message: 'Usuário deletado com sucesso.' })
	} catch (error) {
		request.log.error(error)
		return reply.code(400).send({ message: error.message })
	}
}
