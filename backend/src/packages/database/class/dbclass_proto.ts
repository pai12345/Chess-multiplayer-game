import { Status, Proto_Mongo_Interface } from "../../helper/util/helper";
import mongoose from "mongoose";

/**
 * Template - MongoDB Class
 * @description
 * Abstract Class for MongoDB Class
 */
abstract class Proto_Mongo implements Proto_Mongo_Interface {
  abstract Connect_DB(): Promise<{
    code: Status;
    message: Status | string;
  }>;
  abstract Disconnect_DB(): void;
  abstract Define_Schema(data: any): mongoose.Schema<any>;
  abstract Define_Model(
    schema_name: string,
    schema_definition: mongoose.Schema<any>,
    collection: any
  ): mongoose.Model<mongoose.Document, {}>;
}

export default Proto_Mongo;
