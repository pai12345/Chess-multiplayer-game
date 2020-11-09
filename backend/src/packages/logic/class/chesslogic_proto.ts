import { Proto_ChessLogic_Interface } from "../../helper/util/helper";
import { Server, Socket } from "socket.io";

/**
 * Template - ChessLogic
 * @description
 * Abstract Class for ChessLogic
 */
abstract class Proto_ChessLogic implements Proto_ChessLogic_Interface {
  abstract initializeGame(sio: Server, socket: Socket): void;
}

export default Proto_ChessLogic;
