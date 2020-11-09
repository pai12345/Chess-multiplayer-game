import React, {
  Fragment,
  useEffect,
  useContext,
  useState,
  SetStateAction,
  ReactText,
  Component,
} from "react";
import Game from "../model/chess";
import Square from "../model/square";
import { Stage, Layer } from "react-konva";
import Board from "../assets/chessBoard.png";
import Piece from "./piece";
import piecemap from "./piecemap";
import { useParams } from "react-router-dom";
import { ColorContext } from "../../context/colorcontext";
const socket = require("../../connection/socket").socket;

//Interface for ChessGame class
interface chessgame_intr {
  color: any;
  gameId: any;
  myUserName?: any;
  opponentUserName?: any;
}

class ChessGame extends Component<chessgame_intr> {
  state = {
    gameState: new Game(this.props.color),
    draggedPieceTargetId: "", // empty string means no piece is being dragged
    playerTurnToMoveIsWhite: true,
    whiteKingInCheck: false,
    blackKingInCheck: false,
  };

  // register event listeners
  componentDidMount() {
    socket.on(
      "opponent move",
      (move: {
        playerColorThatJustMovedIsWhite: any;
        selectedId: any;
        finalPosition: any;
      }) => {
        if (move.playerColorThatJustMovedIsWhite !== this.props.color) {
          this.movePiece(
            move.selectedId,
            move.finalPosition,
            this.state.gameState,
            false
          );
          this.setState({
            playerTurnToMoveIsWhite: !move.playerColorThatJustMovedIsWhite,
          });
        }
      }
    );
  }

  //State Drag feature for chess piece
  startDragging = (e: { target: { attrs: { id: any } } }) => {
    this.setState({
      draggedPieceTargetId: e.target.attrs.id,
    });
  };

  /**
   * Function contains "update" which is the connection between the model and the UI.
   * This could also be an HTTP request and the "update" could be the server response.
   * (model is hosted on the server instead of the browser)
   */
  movePiece = (
    selectedId: any,
    finalPosition: any,
    currentGame: { movePiece: (arg0: any, arg1: any, arg2: any) => any },
    isMyMove: any
  ) => {
    let whiteKingInCheck = false;
    let blackKingInCheck = false;
    let blackCheckmated = false;
    let whiteCheckmated = false;
    const update = currentGame.movePiece(selectedId, finalPosition, isMyMove);

    if (update === "moved in the same position.") {
      this.revertToPreviousState(selectedId); // pass in selected ID to identify the piece that messed up
      return;
    } else if (update === "user tried to capture their own piece") {
      this.revertToPreviousState(selectedId);
      return;
    } else if (update === "b is in check" || update === "w is in check") {
      // change the fill of the enemy king or your king based on which side is in check.
      // play a sound or something
      if (update[0] === "b") {
        blackKingInCheck = true;
      } else {
        whiteKingInCheck = true;
      }
    } else if (
      update === "b has been checkmated" ||
      update === "w has been checkmated"
    ) {
      if (update[0] === "b") {
        blackCheckmated = true;
      } else {
        whiteCheckmated = true;
      }
    } else if (update === "invalid move") {
      this.revertToPreviousState(selectedId);
      return;
    }

    // let the server and the other client know your move
    if (isMyMove) {
      socket.emit("new move", {
        nextPlayerColorToMove: !this.state.gameState.thisPlayersColorIsWhite,
        playerColorThatJustMovedIsWhite: this.state.gameState
          .thisPlayersColorIsWhite,
        selectedId: selectedId,
        finalPosition: finalPosition,
        gameId: this.props.gameId,
      });
    }

    // sets the new game state.
    this.setState({
      draggedPieceTargetId: "",
      gameState: currentGame,
      playerTurnToMoveIsWhite: !this.props.color,
      whiteKingInCheck: whiteKingInCheck,
      blackKingInCheck: blackKingInCheck,
    });

    if (blackCheckmated) {
      alert("WHITE WON BY CHECKMATE!");
    } else if (whiteCheckmated) {
      alert("BLACK WON BY CHECKMATE!");
    }
  };

  endDragging = (e: { target: { x: () => number; y: () => number } }) => {
    const currentGame = this.state.gameState;
    const currentBoard = currentGame.getBoard();
    const finalPosition = this.inferCoord(
      e.target.x() + 90,
      e.target.y() + 90,
      currentBoard
    );
    const selectedId = this.state.draggedPieceTargetId;
    this.movePiece(selectedId, finalPosition, currentGame, true);
  };

  revertToPreviousState = (selectedId: any) => {
    /**
     * Should update the UI to what the board looked like before.
     */
    const oldGS = this.state.gameState;
    const oldBoard: any = oldGS.getBoard();
    const tmpGS = new Game(true);
    const tmpBoard: any = [];

    for (let i = 0; i < 8; i++) {
      tmpBoard.push([]);
      for (let j = 0; j < 8; j++) {
        if (oldBoard[i][j].getPieceIdOnThisSquare() === selectedId) {
          tmpBoard[i].push(new Square(j, i, null, oldBoard[i][j].canvasCoord));
        } else {
          tmpBoard[i].push(oldBoard[i][j]);
        }
      }
    }

    // temporarily remove the piece that was just moved
    tmpGS.setBoard(tmpBoard);

    this.setState({
      gameState: tmpGS,
      draggedPieceTargetId: "",
    });

    this.setState({
      gameState: oldGS,
    });
  };

  inferCoord = (
    x: number,
    y: number,
    chessBoard: { getCanvasCoord: () => any }[][]
  ) => {
    /*
     * Should give the closest estimate for new position.
     */
    let hashmap = {};
    let shortestDistance = Infinity;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const canvasCoord = chessBoard[i][j].getCanvasCoord();
        // calculate distance
        const delta_x = canvasCoord[0] - x;
        const delta_y = canvasCoord[1] - y;
        const newDistance = Math.sqrt(delta_x ** 2 + delta_y ** 2);
        hashmap[newDistance] = canvasCoord;
        if (newDistance < shortestDistance) {
          shortestDistance = newDistance;
        }
      }
    }

    return hashmap[shortestDistance];
  };

  render() {
    /*
     * Check the current game state in the model and populate the UI accordingly
     */
    return (
      <Fragment>
        <div
          style={{margin: "auto",           
            backgroundImage: `url(${Board})`, 
            }}>
          <Stage width={720} height={720}>
            <Layer>
              {this.state.gameState.getBoard().map((row: any,index:number) => {
                return (
                  <Fragment key={index}>
                    {row.map(
                      (square: {
                        isOccupied: () => any;
                        getCanvasCoord: () => any[];
                        getPiece: () => {
                          (): any;
                          new (): any;
                          name: ReactText;
                          color: string;
                        };
                        getPieceIdOnThisSquare: () => any;
                      }) => {
                        if (square.isOccupied()) {
                          return (
                            <Piece
                              x={square.getCanvasCoord()[0]}
                              y={square.getCanvasCoord()[1]}
                              imgurls={piecemap[square.getPiece().name]}
                              isWhite={square.getPiece().color === "white"}
                              draggedPieceTargetId={
                                this.state.draggedPieceTargetId
                              }
                              onDragStart={this.startDragging}
                              onDragEnd={this.endDragging}
                              id={square.getPieceIdOnThisSquare()}
                              thisPlayersColorIsWhite={this.props.color}
                              playerTurnToMoveIsWhite={
                                this.state.playerTurnToMoveIsWhite
                              }
                              whiteKingInCheck={this.state.whiteKingInCheck}
                              blackKingInCheck={this.state.blackKingInCheck}
                            />
                          );
                        }
                      }
                    )}
                  </Fragment>
                );
              })}
            </Layer>
          </Stage>
        </div>
      </Fragment>
    );
  }
}

const ChessGameWrapper = (props: { myUserName: {} | null | undefined }) => {
  // get the gameId from the URL here and pass it to the chessGame component as a prop.
  const domainName = window.location.host;
  const color = useContext(ColorContext);
  const { gameid } = useParams<{ gameid }>();
  const [, setOpponentSocketId] = useState("");
  const [opponentDidJoinTheGame, didJoinGame] = useState(false);
  const [opponentUserName, setUserName] = useState("");
  const [gameSessionDoesNotExist, doesntExist] = useState(false);

  //Hook Function for Updating Component
  useEffect(() => {
    socket.on(
      "playerJoinedRoom",
      (statusUpdate: {
        userName: string;
        gameId: string;
        mySocketId: SetStateAction<string>;
      }) => {
        if (socket.id !== statusUpdate.mySocketId) {
          setOpponentSocketId(statusUpdate.mySocketId);
        }
      }
    );

    socket.on("status", (statusUpdate: string) => {
      alert(statusUpdate);
      if (
        statusUpdate === "This game session does not exist."
      ) {
        doesntExist(true);
      }
    });

    socket.on("start game", (opponentUserName: SetStateAction<string>) => {
      if (opponentUserName !== props.myUserName) {
        setUserName(opponentUserName);
        didJoinGame(true);
      } else {
        // in chessGame, pass opponentUserName as a prop and label it as the enemy.
        // in chessGame, use reactContext to get your own userName
        socket.emit("request username", gameid);
      }
    });

    socket.on("give userName", (socketId: any) => {
      if (socket.id !== socketId) {
        socket.emit("recieved userName", {
          userName: props.myUserName,
          gameId: gameid,
        });
      }
    });

    socket.on(
      "get Opponent UserName",
      (data: {
        socketId: SetStateAction<string>;
        userName: SetStateAction<string>;
      }) => {
        if (socket.id !== data.socketId) {
          setUserName(data.userName);
          setOpponentSocketId(data.socketId);
          didJoinGame(true);
        }
      }
    );
  }, [gameid, props.myUserName]);

  return (
    <Fragment>
      {opponentDidJoinTheGame ? (
        <div style={{textAlign: "center"}}>
          <h4> Opponent: {opponentUserName} </h4>
          <div style={{ display: "flex" }}>
            <ChessGame gameId={gameid} color={color.didRedirect} />
          </div>
          <h4> You: {props.myUserName} </h4>
        </div>
      ) : gameSessionDoesNotExist ? (
        <div>
          <h1 style={{ textAlign: "center", marginTop: "200px" }}> :( </h1>
        </div>
      ) : (
        <div>
          <h1
            style={{
              textAlign: "center",
              marginTop: String(window.innerHeight / 8) + "px",
            }}
          >
            Welcome <strong>{props.myUserName}</strong>, send the URL below to other player to join game:
          </h1>
          <textarea
            style={{
              marginLeft: String(window.innerWidth / 2 - 290) + "px",
              marginTop: "30px",
              width: "580px",
              height: "30px",
            }}
            onFocus={(event) => {
              event.target.select();
            }}
            value={domainName + "/game/" + gameid}
          ></textarea>
          <br></br>

          <h1 style={{ textAlign: "center", marginTop: "100px" }}>
            {" "}
            Waiting for other player to join the game...{" "}
          </h1>
        </div>
      )}
    </Fragment>
  );
};

export default ChessGameWrapper;
