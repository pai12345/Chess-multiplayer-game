"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helperclass_proto_1 = __importDefault(require("../class/helperclass_proto"));
const helper_1 = require("../helper");
class Helper extends helperclass_proto_1.default {
    constructor() {
        super();
    }
    generatemessage(status, message, data) {
        const result = {
            status: status,
            message: message,
            data: data,
        };
        return result;
    }
    nullishcoalesce(data) {
        const validate = (data !== null && data !== void 0 ? data : helper_1.Status.NotResponding);
        return validate;
    }
}
const helper = new Helper();
exports.default = helper;
//# sourceMappingURL=helperclass.js.map