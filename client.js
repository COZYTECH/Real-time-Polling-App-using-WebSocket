import WebSocket from "ws";
import readline from "readline";

const ws = new WebSocket("ws://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

io.on("open", () => {
  console.log("Connected to server");
  rl.setPrompt("Vote (optionA/optionB): ");
  rl.prompt();

  rl.on("line", (line) => {
    ws.send(JSON.stringify({ type: "vote", option: line.trim() }));
    rl.prompt();
  });
});

io.on("message", (message) => {
  const msg = JSON.parse(message);
  if (msg.type === "pollUpdate") {
    console.clear();
    console.log("Live Poll Results:", msg.data);
    rl.prompt();
  }
});

io.on("close", () => console.log("Disconnected from server"));
