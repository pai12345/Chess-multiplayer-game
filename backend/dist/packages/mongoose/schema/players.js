"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbclass_1 = __importDefault(require("../class/dbclass"));
const game = dbclass_1.default.Define_Schema({
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
exports.default = generateSchema;
//# sourceMappingURL=players.js.map