"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDB = {
    MONGODB_URI: "mongodb+srv://admin:admin@cluster-andromeda.ms09l.mongodb.net/Andromeda?retryWrites=true&w=majority",
};
const generateEnv = () => {
    return {
        MongoDB: MongoDB,
    };
};
exports.default = generateEnv;
//# sourceMappingURL=config.js.map