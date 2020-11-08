"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const logic_1 = __importDefault(require("./packages/logic/class/logic"));
const cors_1 = __importDefault(require("cors"));
const helper_1 = require("./helper/helper");
const app = express_1.default();
app.use(cors_1.default({ origin: "*" }));
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
io.on("connection", (client) => {
    logic_1.default(io, client);
});
server.listen((_a = process.env.LISTEN_PORT, (_a !== null && _a !== void 0 ? _a : "3000")), 10);
process.on("SIGTERM", () => {
    console.log(helper_1.Status.Closing_http_server);
    server.close(() => {
        console.log(helper_1.Status.Http_server_closed);
        process.exit(0);
    });
    process.exit(0);
});
//# sourceMappingURL=index.js.map