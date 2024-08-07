
const io = require('socket.io')();

const users = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    if (!users[roomId]) {
      users[roomId] = [];
    }
    users[roomId].push(socket.id);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  socket.on('disconnect', () => {
    for (const roomId in users) {
      const index = users[roomId].indexOf(socket.id);
      if (index !== -1) {
        users[roomId].splice(index, 1);
      }
    }
  });
});

const port = process.env.PORT || 5000;
io.listen(port);
console.log(`Signaling server listening on port ${port}`);
