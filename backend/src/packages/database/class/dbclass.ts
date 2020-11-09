import mongoose from "mongoose";
import { Status, Proto_Mongo_Interface } from "../../helper/util/helper";
import generateEnv from "../config/config";
import Proto_Mongo from "./dbclass_proto";

/**
 * Class - Mongo
 * @description
 * Class contains Attributes and Methods for MongoDB Class
 */
class Mongo extends Proto_Mongo implements Proto_Mongo_Interface {
  /**
   * Function - Connect
   * @description
   * Function to Connect new DB Instance
   */
  async Connect_DB() {
    try {
      const MONGODB_URI = generateEnv().MongoDB.MONGODB_URI;

      mongoose.set("useUnifiedTopology", true);
      mongoose.set("useNewUrlParser", true);
      mongoose.set("useCreateIndex", true);

      const connect = mongoose.connect(`${MONGODB_URI}`);
      await Promise.all([connect]);
      return { code: Status.Success, message: Status.SuccessMessage };
    } catch (error) {
      return { code: Status.ServerError, message: `${error}` };
    }
  }
  /**
   * Function - Disconnect
   * @description
   * Function to Disconnect DB Instance
   */
  Disconnect_DB() {
    mongoose.disconnect();
  }
  /**
   * Function - Schema
   * @description
   * Function to define DB Schema
   */
  Define_Schema(data: any) {
    const { Schema } = mongoose;
    const newSchema = new Schema(data);
    return newSchema;
  }
  /**
   * Function - Model
   * @description
   * Function to define DB Model
   */
  Define_Model(
    schema_name: string,
    schema_definition: mongoose.Schema<any>,
    collection: any
  ) {
    const { model } = mongoose;
    const newmodel = model(schema_name, schema_definition, collection);
    return newmodel;
  }
}

/**
 * Instance - Mongo
 * @description
 * Instance having Attributes and Methods of Mongo Class .
 */
const mongodb = new Mongo();
export default mongodb;
