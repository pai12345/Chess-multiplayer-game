import express from "express";
import http from "http";
import socketio from "socket.io";
import chesslogic from "./packages/logic/class/chesslogic";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (client: any) => {
  chesslogic.initializeGame(io, client);
});

server.listen(process.env.LISTEN_PORT ?? "3000", 10);

//Server graceful exit
process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
  process.exit(0);
});
