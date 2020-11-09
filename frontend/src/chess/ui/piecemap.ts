/**
 * Contains the details of all the chess piece images used on board.
 */
const chess_pieces = {
  pawn: [
    `${require("../assets/pieces/png/white/p.png").default}`,
    `${require("../assets/pieces/png/black/p.png").default}`,
  ],
  knight: [
    `${require("../assets/pieces/png/white/n.png").default}`,
    `${require("../assets/pieces/png/black/n.png").default}`,
  ],
  bishop: [
    `${require("../assets/pieces/png/white/b.png").default}`,
    `${require("../assets/pieces/png/black/b.png").default}`,
  ],
  king: [
    `${require("../assets/pieces/png/white/k.png").default}`,
    `${require("../assets/pieces/png/black/k.png").default}`,
  ],
  queen: [
    `${require("../assets/pieces/png/white/q.png").default}`,
    `${require("../assets/pieces/png/black/q.png").default}`,
  ],
  rook: [
    `${require("../assets/pieces/png/white/r.png").default}`,
    `${require("../assets/pieces/png/black/r.png").default}`,
  ],
};

export default chess_pieces;
