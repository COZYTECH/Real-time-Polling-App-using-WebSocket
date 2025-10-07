// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   // options
// });

// io.on("connection", (socket) => {
//   // ...
// });

// httpServer.listen(3000, () => {
//   console.log("serving is running on 3000");
// });
// import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

let poll = { optionA: 0, optionB: 0 };

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("pollUpdate", poll);

  socket.on("vote", (option) => {
    if (poll[option] !== undefined) {
      poll[option]++;
      io.emit("pollUpdate", poll); // broadcast to all
    }
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

httpServer.listen(3000, () =>
  console.log("Server running on ws://localhost:3000")
);
