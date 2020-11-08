import express from "express";
import http from "http";
import socketio from "socket.io";
import initializeGame from "./packages/logic/class/logic";
import cors from "cors";
import { Status } from "./helper/helper";

const app = express();
app.use(cors({ origin: "*" }));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (client: any) => {
  initializeGame(io, client);
});

server.listen(process.env.LISTEN_PORT ?? "3000", 10);

//Server graceful exit
process.on("SIGTERM", () => {
  console.log(Status.Closing_http_server);
  server.close(() => {
    console.log(Status.Http_server_closed);
    process.exit(0);
  });
  process.exit(0);
});
