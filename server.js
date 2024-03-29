const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app); // Create an HTTP server with Express app
const io = socketIo(server); // Initialize Socket.IO with the HTTP server

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/auth/signup', async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, firstname, lastname, password: hashedPassword });
  await user.save();
  res.redirect('/login.html'); // Redirect to login page after signup
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    res.redirect('/group_chat.html');
  } else {
    res.send('Login failed');
  }
});

io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);
  
    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
      socket.to(room).emit('message', `User ${socket.id} has joined the room.`);
    });
  
    socket.on('chat_message', ({ room, message }) => {
      io.to(room).emit('message', message);
    });
  
    socket.on('typing', (room) => {
      socket.to(room).emit('typing', `User ${socket.id} is typing...`);
    });
  
    socket.on('leave_room', (room) => {
      socket.leave(room);
      console.log(`User ${socket.id} left room ${room}`);
      socket.to(room).emit('message', `User ${socket.id} has left the room.`);
    });
  
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
