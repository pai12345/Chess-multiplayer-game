"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const players_1 = __importDefault(require("../../mongoose/model/players"));
const dbclass_1 = __importDefault(require("../../mongoose/class/dbclass"));
const helper_1 = require("../../../helper/helper");
const helperclass_1 = __importDefault(require("../../../helper/class/helperclass"));
const initializeGame = (sio, socket) => {
    const io = sio;
    const gameSocket = socket;
    const gamesInSession = [];
    gamesInSession.push(gameSocket);
    gameSocket.on("disconnect", () => {
        const i = gamesInSession.indexOf(gameSocket);
        gamesInSession.splice(i, 1);
    });
    gameSocket.on("new move", async (move) => {
        const gameId = move.gameId;
        Push_Game(move);
        io.to(gameId).emit("opponent move", move);
        console.log("move(new move):", move);
    });
    gameSocket.on("createNewGame", (gameId) => {
        socket.emit("createNewGame", { gameId: gameId, mySocketId: socket.id });
        console.log("gameId(createNewGame):", gameId, "socket:", socket);
        socket.join(gameId);
    });
    gameSocket.on("playerJoinGame", (idData) => {
        const room = io.sockets.adapter.rooms[idData.gameId];
        if (room === undefined) {
            socket.emit("status", "This game session does not exist.");
            return;
        }
        else {
            idData.mySocketId = socket.id;
            socket.join(idData.gameId);
            if (room.length > 1) {
                io.sockets.in(idData.gameId).emit("start game", idData.userName);
            }
            io.sockets.in(idData.gameId).emit("playerJoinedRoom", idData);
        }
        console.log("idData(playerJoinGame):", idData);
    });
    gameSocket.on("request username", (gameId) => {
        io.to(gameId).emit("give userName", socket.id);
        console.log("socket.id(request username):", socket.id);
    });
    gameSocket.on("recieved userName", (data) => {
        data.socketId = socket.id;
        io.to(data.gameId).emit("get Opponent UserName", data);
        console.log("data(recieved userName):", data);
    });
};
const Push_Game = async (move) => {
    try {
        const openconnection_MongoDB = await dbclass_1.default.Connect_DB();
        const { code, message } = openconnection_MongoDB;
        if (code === 200) {
            const model = players_1.default().game;
            const push_message = new model({
                finalPosition: move.finalPosition,
                gameId: move.gameId,
                nextPlayerColorToMove: move.nextPlayerColorToMove,
                playerColorThatJustMovedIsWhite: move.playerColorThatJustMovedIsWhite,
                selectedId: move.selectedId,
            });
            const result = await push_message.save();
            return result;
        }
        else {
            const error = helperclass_1.default.generatemessage(helper_1.Status.ServerError, helper_1.Status.ServerErrorMessage, message);
            return error;
        }
    }
    catch (error) {
        return error;
    }
    finally {
        dbclass_1.default.Disconnect_DB();
    }
};
exports.default = initializeGame;
//# sourceMappingURL=logic.js.map