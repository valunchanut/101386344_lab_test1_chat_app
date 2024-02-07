const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const express_server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
})

const ioServer = require('socket.io')(express_server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/group-chat', (req, res) => {
    res.sendFile(__dirname + '/group_chat.html');
})

ioServer.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('say_hello', (msg) => {
        console.log(msg);
        //ioServer.emit('welcome', msg)//broadcast to all
        socket.emit('welcome', msg)
    })

    socket.on('chat_message', (msg) => {
        ioServer.emit('chat_message', msg);
    });

    //Join a room
    socket.on('join_group', (room) => {
        console.log(`User ${socket.id} joined room ${room}`)
        socket.join(room);
    })

    //Send message to a room
    socket.on('group_message', (data) => {
        console.log(`User ${socket.id} sent message to room ${data.group}`)
        ioServer.to(data.group).emit('group_message_client', data.message)
    });

    //Leave a room
    socket.on('leave_group', (group) => {
        socket.leave(group);
    })

    //socket.broadcast.emit('chat_message', 'A new user has joined the chat');

})