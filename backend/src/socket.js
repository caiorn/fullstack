import { Server } from 'socket.io'
import { registerChatEvents } from './sockets/chat2.js'
import { registerToggleAndIncrementEvents } from './sockets/toogle.js'

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
		console.log('🔌 Cliente conectado:', socket.id);
		console.log('Número de clientes conectados:', io.engine.clientsCount);
		socket.on('disconnect', (reason) => {
			console.log(`🔌 Cliente desconectado: ${socket.id}. Motivo: ${reason}`);
		});
		socket.on('error', (err) => {
			console.error(`🔌 Erro no socket ${socket.id}:`, err);
		});

		registerChatEvents(io, socket)
		registerToggleAndIncrementEvents(io, socket)

	})

	return io
}
