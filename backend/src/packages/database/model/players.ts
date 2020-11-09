import generateSchema from "../schema/players";
import mongodb from "../class/dbclass";

const game = mongodb.Define_Model("Game", generateSchema().game, "Game");

const generateModel = () => {
  return {
    game: game,
  };
};

export default generateModel;
