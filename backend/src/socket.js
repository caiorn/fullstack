import { Server } from 'socket.io'
import { handleChatEvents } from './controllers/chatController.js'

export function configureSocketIO(httpServer) {
	const io = new Server(httpServer, {
		cors: {
			origin: true,
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
			optionsSuccessStatus: 200
		}
	})

	io.on('connection', (socket) => {
		console.log('🔌 cliente conectado:', socket.id)

		// Delega a lógica do chat para o controlador
		handleChatEvents(io, socket)
	})

	return io
}
