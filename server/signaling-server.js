const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  socket.on("handshake", (data, roomId) => {
    console.log(data);
    socket.to(roomId).broadcast.emit("handshake", data);
  });

  socket.on("join", roomId => {
    socket.join(roomId);
    const roomsLength = io.of("/").adapter.rooms[roomId].length;
    const isInitiator = !(roomsLength - 1);
    if (!isInitiator) {
      socket.to(roomId).broadcast.emit("receiver-arrival");
    }
  });
});

app.use(express.static(path.resolve(__dirname + "/../build")));

app.get("/:token", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../build/index.html"));
});

http.listen("9999", () => {
  console.log("Listening on 9999");
});
