const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new user");
  socket.on("send-email", (data) => {
    const emailArea = document.getElementById("email");
    emailArea.textContent = data.message;
  });
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
