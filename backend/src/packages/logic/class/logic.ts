import generateModel from "../../mongoose/model/players";
import mongodb from "../../mongoose/class/dbclass";
import { Status } from "../../../helper/helper";
import helper from "../../../helper/class/helperclass";

const initializeGame = (sio: any, socket: any) => {
  const io = sio;
  const gameSocket = socket;
  const gamesInSession: any = [];

  gamesInSession.push(gameSocket);

  gameSocket.on("disconnect", () => {
    const i = gamesInSession.indexOf(gameSocket);
    gamesInSession.splice(i, 1);
  });

  gameSocket.on("new move", async (move: any) => {
    const gameId = move.gameId;
    Push_Game(move);
    io.to(gameId).emit("opponent move", move);
    console.log("move(new move):", move);
  });

  gameSocket.on("createNewGame", (gameId: any) => {
    socket.emit("createNewGame", { gameId: gameId, mySocketId: socket.id });
    console.log("gameId(createNewGame):", gameId, "socket:", socket);
    socket.join(gameId);
  });

  gameSocket.on("playerJoinGame", (idData: any) => {
    const room = io.sockets.adapter.rooms[idData.gameId];
    if (room === undefined) {
      socket.emit("status", "This game session does not exist.");
      return;
    } else {
      idData.mySocketId = socket.id;
      socket.join(idData.gameId);

      if (room.length > 1) {
        io.sockets.in(idData.gameId).emit("start game", idData.userName);
      }
      io.sockets.in(idData.gameId).emit("playerJoinedRoom", idData);
    }
    console.log("idData(playerJoinGame):", idData);
  });

  gameSocket.on("request username", (gameId: any) => {
    io.to(gameId).emit("give userName", socket.id);
    console.log("socket.id(request username):", socket.id);
  });

  gameSocket.on("recieved userName", (data: any) => {
    data.socketId = socket.id;
    io.to(data.gameId).emit("get Opponent UserName", data);
    console.log("data(recieved userName):", data);
  });
};

const Push_Game = async (move: any) => {
  try {
    const openconnection_MongoDB = await mongodb.Connect_DB();
    const { code, message } = openconnection_MongoDB;

    if (code === 200) {
      const model = generateModel().game;
      const push_message = new model({
        finalPosition: move.finalPosition,
        gameId: move.gameId,
        nextPlayerColorToMove: move.nextPlayerColorToMove,
        playerColorThatJustMovedIsWhite: move.playerColorThatJustMovedIsWhite,
        selectedId: move.selectedId,
      });
      const result = await push_message.save();
      return result;
    } else {
      const error = helper.generatemessage(
        Status.ServerError,
        Status.ServerErrorMessage,
        message
      );
      return error;
    }
  } catch (error) {
    return error;
  } finally {
    mongodb.Disconnect_DB();
  }
};

export default initializeGame;
