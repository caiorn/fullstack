// Armazenamento em memória
const onlineUsers = new Set();
const messageHistory = [];
const userConnections = new Map();

export function registerChatEvents(io, socket) {
	socket.on('login', (data) => handleLogin(io, socket, data));
	socket.on('message', (data) => handleMessage(io, data));
	socket.on('disconnect', () => handleDisconnect(io, socket));
}

// 🟢 Login
function handleLogin(io, socket, data) {
	const { username } = data;

	onlineUsers.add(username);
	userConnections.set(username, socket.id);

	socket.emit('history', { messages: messageHistory });
	io.emit('users', { users: Array.from(onlineUsers) });

	addSystemMessage(io, `${username} entrou no chat`);
	console.log(`👤 Usuário ${username} entrou no chat`);
}

// 💬 Mensagem
function handleMessage(io, data) {
	console.log('🗨️ Mensagem recebida:', data);

	if (!data.timestamp) {
		data.timestamp = new Date().toISOString();
	}

	messageHistory.push(data);
	if (messageHistory.length > 100) messageHistory.shift();

	io.emit('message', data);
}

// ❌ Desconexão
function handleDisconnect(io, socket) {
	console.log('❌ Cliente desconectado:', socket.id);

	let disconnectedUser = null;

	for (const [username, socketId] of userConnections.entries()) {
		if (socketId === socket.id) {
			disconnectedUser = username;
			break;
		}
	}

	if (disconnectedUser) {
		onlineUsers.delete(disconnectedUser);
		userConnections.delete(disconnectedUser);

		io.emit('users', { users: Array.from(onlineUsers) });
		addSystemMessage(io, `${disconnectedUser} saiu do chat`);

		console.log(`👤 Usuário ${disconnectedUser} saiu do chat`);
	}
}

// 🔔 Mensagem de sistema
function addSystemMessage(io, text) {
	const systemMessage = {
		type: 'message',
		username: 'Sistema',
		text,
		timestamp: new Date().toISOString()
	};

	messageHistory.push(systemMessage);
	if (messageHistory.length > 100) messageHistory.shift();

	io.emit('message', systemMessage);
}