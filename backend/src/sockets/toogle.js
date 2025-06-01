let counter = 0;

export function registerToggleAndIncrementEvents(io, socket) {

    // Evento para alternar o estado de um item
    socket.on('sample:toggle', (boolStatus) => {
        console.log(`sample state: ${boolStatus}`);
        // Aqui você pode adicionar a lógica para alternar o estado do item
        // Por exemplo, atualizar o estado no banco de dados ou em memória

        // envia para todos incluindo o emissor
        io.emit('sample:itemToggled', boolStatus); // Notifica todos os clientes conectados
    });

    // Enviar o estado atual para o novo cliente ao conectar
    socket.emit('sample:counterIncremented', counter);
    // Evento para incrementar um contador
    socket.on('sample:increment', (newValue) => {
        console.log(`sample counter: ${newValue}`);
        counter = newValue;
        //envia para todos exceto o emissor
        socket.broadcast.emit('sample:counterIncremented', newValue); // Notifica todos os clientes conectados
    });
}