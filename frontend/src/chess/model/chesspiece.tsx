/**
 * Chess Piece Class
 * @description
 * Class having details of implementation and logic used for fetching and setting square for piece.
 */
class ChessPiece {
  name: string;
  isAttacked: boolean;
  color: string;
  id: string;
  squareThisPieceIsOn: any;
  constructor(name: string, isAttacked: boolean, color: string, id: string) {
    this.name = name;
    this.isAttacked = isAttacked;
    this.color = color;
    this.id = id;
  }

  // set the square this piece is sitting top of.
  // on any given piece (on the board), there will always be a piece on top of it.
  setSquare(newSquare) {
    if (newSquare === undefined) {
      this.squareThisPieceIsOn = newSquare;
      return;
    }

    if (this.squareThisPieceIsOn === undefined) {
      this.squareThisPieceIsOn = newSquare;
      newSquare.setPiece(this);
    }

    const isNewSquareDifferent =
      this.squareThisPieceIsOn.x !== newSquare.x ||
      this.squareThisPieceIsOn.y !== newSquare.y;

    if (isNewSquareDifferent) {
      this.squareThisPieceIsOn = newSquare;
      newSquare.setPiece(this);
    }
  }

  //get square where the chess piece is on
  getSquare() {
    return this.squareThisPieceIsOn;
  }
}

export default ChessPiece;
