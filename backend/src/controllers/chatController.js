// Armazenamento em memória
const onlineUsers = new Set()
const messageHistory = []
const userConnections = new Map()

export function handleChatEvents(io, socket) {
	// Evento de login
	socket.on('login', (data) => {
		const { username } = data

		onlineUsers.add(username)
		userConnections.set(username, socket.id)

		socket.emit('history', { messages: messageHistory })
		io.emit('users', { users: Array.from(onlineUsers) })

		addSystemMessage(io, `${username} entrou no chat`)
		console.log(`👤 Usuário ${username} entrou no chat`)
	})

	// Evento de mensagem
	socket.on('message', (data) => {
		console.log('🗨️ Mensagem recebida:', data)

		if (!data.timestamp) {
			data.timestamp = new Date().toISOString()
		}

		messageHistory.push(data)

		if (messageHistory.length > 100) {
			messageHistory.shift()
		}

		io.emit('message', data)
	})

	// Evento de desconexão
	socket.on('disconnect', () => {
		console.log('❌ Cliente desconectado:', socket.id)

		let disconnectedUser = null
		for (const [username, socketId] of userConnections.entries()) {
			if (socketId === socket.id) {
				disconnectedUser = username
				break
			}
		}

		if (disconnectedUser) {
			onlineUsers.delete(disconnectedUser)
			userConnections.delete(disconnectedUser)

			io.emit('users', { users: Array.from(onlineUsers) })
			addSystemMessage(io, `${disconnectedUser} saiu do chat`)

			console.log(`👤 Usuário ${disconnectedUser} saiu do chat`)
		}
	})
}

// Função para adicionar uma mensagem de sistema ao histórico
function addSystemMessage(io, text) {
	const systemMessage = {
		type: 'message',
		username: 'Sistema',
		text: text,
		timestamp: new Date().toISOString()
	}

	messageHistory.push(systemMessage)

	if (messageHistory.length > 100) {
		messageHistory.shift()
	}

	io.emit('message', systemMessage)
}
