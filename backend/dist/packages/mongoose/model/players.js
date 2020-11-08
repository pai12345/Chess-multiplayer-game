"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const players_1 = __importDefault(require("../schema/players"));
const dbclass_1 = __importDefault(require("../class/dbclass"));
const game = dbclass_1.default.Define_Model("Game", players_1.default().game, "Game");
const generateModel = () => {
    return {
        game: game,
    };
};
exports.default = generateModel;
//# sourceMappingURL=players.js.map