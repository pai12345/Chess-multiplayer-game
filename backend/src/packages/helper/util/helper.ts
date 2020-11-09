import mongoose from "mongoose";
import { Server, Socket } from "socket.io";

/**
 * Enumeration for API Status
 * @description
 * Enumeration having details for API Status
 */
export enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
  Unavailable = 503,
  BADREQUEST = 400,
  BADREQUESTMessage = "Bad Request",
  ServerErrorMessage = "Server Error",
  SuccessMessage = "Success",
  ErrorMessage = "Error",
  WebServerTitle = "Web Server",
  WebServerBody = "Microservice Web Server",
  PageNotFoundTitlte = "Service Not Found",
  PageNotFoundBody = `404 - Service Not Found`,
  ListeningonPort = "Listening on Port",
  NotResponding = "Server did not response with any valid data",
  MongoDB_session_error = "Mongo session error",
  Closing_http_server = "Closing http server",
  Http_server_closed = "Http server closed",
}

/**
 * Interface - Mongo Class
 * @description
 * Interface for Mongo Class with details of implmentation.
 */
export interface Proto_Mongo_Interface {
  Connect_DB(): Promise<{
    code: Status;
    message: Status | string;
  }>;
  Disconnect_DB(): void;
  Define_Schema(data: any): mongoose.Schema<any>;
  Define_Model(
    schema_name: string,
    schema_definition: mongoose.Schema<any>,
    collection: any
  ): mongoose.Model<mongoose.Document, {}>;
}

/**
 * Interface - ResultObj
 * @description
 * Interface having details of function response for ResultObj.
 */
export interface ResultObj_Response_Interface {
  status: number;
  message: string;
  data: any;
}

/**
 * Interface - Helper Class
 * @description
 * Interface for Helper Class with details of implmentation.
 */
export interface Helper_interface {
  generatemessage(
    status: number,
    message: string,
    data: any
  ): ResultObj_Response_Interface;
  nullishcoalesce(data: any): any;
}

/**
 * Interface - ChessLogic
 * @description
 * Interface for ChessLogic with details of implmentation.
 */
export interface Proto_ChessLogic_Interface {
  initializeGame(sio: Server, socket: Socket): void;
}
