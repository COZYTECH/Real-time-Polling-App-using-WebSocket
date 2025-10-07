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
const io = new Server(httpServer, {
  // options
});

let poll = {
  optionA: 0,
  optionB: 0,
};

io.on("connection", (ws) => {
  console.log("Client connected");

  // Send current poll state immediately
  io.send(JSON.stringify({ type: "pollUpdate", data: poll }));

  io.on("message", (message) => {
    const msg = JSON.parse(message);

    if (msg.type === "vote") {
      poll[msg.option] += 1;

      // Broadcast updated poll to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "pollUpdate", data: poll }));
        }
      });
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

httpServer.listen(3000, () => {
  console.log("serving is running on 3000");
});
