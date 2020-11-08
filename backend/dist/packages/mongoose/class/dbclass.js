"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const helper_1 = require("../../../helper/helper");
const config_1 = __importDefault(require("../config/config"));
const dbclass_proto_1 = __importDefault(require("./dbclass_proto"));
class Mongo extends dbclass_proto_1.default {
    async Connect_DB() {
        try {
            const MONGODB_URI = config_1.default().MongoDB.MONGODB_URI;
            mongoose_1.default.set("useUnifiedTopology", true);
            mongoose_1.default.set("useNewUrlParser", true);
            mongoose_1.default.set("useCreateIndex", true);
            const connect = mongoose_1.default.connect(`${MONGODB_URI}`);
            await Promise.all([connect]);
            return { code: helper_1.Status.Success, message: helper_1.Status.SuccessMessage };
        }
        catch (error) {
            return { code: helper_1.Status.ServerError, message: `${error}` };
        }
    }
    Disconnect_DB() {
        mongoose_1.default.disconnect();
    }
    Define_Schema(data) {
        const { Schema } = mongoose_1.default;
        const newSchema = new Schema(data);
        return newSchema;
    }
    Define_Model(schema_name, schema_definition, collection) {
        const { model } = mongoose_1.default;
        const newmodel = model(schema_name, schema_definition, collection);
        return newmodel;
    }
}
const mongodb = new Mongo();
exports.default = mongodb;
//# sourceMappingURL=dbclass.js.map