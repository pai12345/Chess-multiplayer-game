import { Status, Proto_MongoDB_Interface } from "../../../helper/helper";
import mongoose from "mongoose";
declare abstract class Proto_MongoDB implements Proto_MongoDB_Interface {
    abstract Connect_DB(): Promise<{
        code: Status;
        message: Status | string;
    }>;
    abstract Disconnect_DB(): void;
    abstract Define_Schema(data: any): mongoose.Schema<any>;
    abstract Define_Model(schema_name: string, schema_definition: mongoose.Schema<any>, collection: any): mongoose.Model<mongoose.Document, {}>;
}
export default Proto_MongoDB;
//# sourceMappingURL=dbclass_proto.d.ts.map