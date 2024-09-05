const socketIO = require('socket.io');

module.exports = function(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            io.emit('number', randomNumber); // Emit random number
        }, 1000);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
