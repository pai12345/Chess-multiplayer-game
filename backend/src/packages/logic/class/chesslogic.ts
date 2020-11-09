import generateModel from "../../database/model/players";
import mongodb from "../../database/class/dbclass";
import { Status, Proto_ChessLogic_Interface } from "../../helper/util/helper";
import helper from "../../helper/class/helperclass";
import Proto_ChessLogic from "./chesslogic_proto";
import { Server, Socket } from "socket.io";

/**
 * ChessLogic Class
 * @description
 * ChessLogic Class contains Attributes and Methods for Application.
 */
class ChessLogic
  extends Proto_ChessLogic
  implements Proto_ChessLogic_Interface {
  private gamesInSession: any = [];
  constructor() {
    super();
  }
  /**
   * Function - initializeGame
   * @description Function to initialize game
   * @param sio socket io
   * @param socket socket connection
   */
  initializeGame(sio: Server, socket: Socket) {
    try {
      const io = sio;
      const gameSocket = socket;
      this.gamesInSession.push(gameSocket);

      //disconnect connection
      gameSocket.on("disconnect", () => {
        const i = this.gamesInSession.indexOf(gameSocket);
        this.gamesInSession.splice(i, 1);
      });

      //Track new moves for each chess piece
      gameSocket.on("new move", async (move: any) => {
        const gameId = move.gameId;
        this.push_game(move);

        io.to(gameId).emit("opponent move", move);
      });

      //generate new game for chess
      gameSocket.on("createNewGame", (gameId: any) => {
        socket.emit("createNewGame", { gameId: gameId, mySocketId: socket.id });

        socket.join(gameId);
      });

      //Track all new players joining game
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
      });

      //Track requests for players username
      gameSocket.on("request username", (gameId: any) => {
        io.to(gameId).emit("give userName", socket.id);
      });

      //Track recieved names for players
      gameSocket.on("recieved userName", (data: any) => {
        data.socketId = socket.id;
        io.to(data.gameId).emit("get Opponent UserName", data);
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * Function - push_game
   * @description Function to push game data to MongoDB
   * @param move chess piece position details object
   * @returns message object for success/error
   */
  private async push_game(move: any) {
    try {
      //Open new DB Connection
      const openconnection_MongoDB = await mongodb.Connect_DB();
      const { code, message } = openconnection_MongoDB;

      if (code === 200) {
        //Generate new model for existing connection
        const model = generateModel().game;
        //Model object with incoming request data
        const push_message = new model({
          finalPosition: move.finalPosition,
          gameId: move.gameId,
          nextPlayerColorToMove: move.nextPlayerColorToMove,
          playerColorThatJustMovedIsWhite: move.playerColorThatJustMovedIsWhite,
          selectedId: move.selectedId,
        });
        //Push Model object to DB
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
      throw error;
    } finally {
      //Close connection to DB
      mongodb.Disconnect_DB();
    }
  }
}

const chesslogic = new ChessLogic();
export default chesslogic;
