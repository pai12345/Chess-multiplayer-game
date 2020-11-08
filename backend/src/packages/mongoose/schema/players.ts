import mongodb from "../class/dbclass";

const game = mongodb.Define_Schema({
  finalPosition: { type: [Number] },
  gameId: { type: String },
  nextPlayerColorToMove: { type: Boolean },
  playerColorThatJustMovedIsWhite: { type: Boolean },
  selectedId: { type: String },
});

const generateSchema = () => {
  return {
    game: game,
  };
};

export default generateSchema;
