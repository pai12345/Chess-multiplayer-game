import mongoose from "mongoose";
import { Status, Proto_MongoDB_Interface } from "../../../helper/helper";
import Proto_MongoDB from "./dbclass_proto";
declare class Mongo extends Proto_MongoDB implements Proto_MongoDB_Interface {
    Connect_DB(): Promise<{
        code: Status;
        message: Status;
    } | {
        code: Status;
        message: string;
    }>;
    Disconnect_DB(): void;
    Define_Schema(data: any): mongoose.Schema<any>;
    Define_Model(schema_name: string, schema_definition: mongoose.Schema<any>, collection: any): mongoose.Model<mongoose.Document, {}>;
}
declare const mongodb: Mongo;
export default mongodb;
//# sourceMappingURL=dbclass.d.ts.map