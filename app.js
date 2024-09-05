const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes/mainRoutes');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/login')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the router
app.use('/', router);

// Create an HTTP server and bind it to the Express app
const http = require('http');
const server = http.createServer(app);

// Integrate Socket.IO
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Emit a welcome message to the newly connected client
  socket.emit('message', 'Welcome to the server!');

  // Listen for messages from the client
  socket.on('message', (msg) => {
    console.log('Message received: ' + msg);
  });

  // Emit an example event every second
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    io.emit('number', randomNumber); // Emit a random number
  }, 1000);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
