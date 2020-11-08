import mongoose from "mongoose";
export declare enum Status {
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
    PageNotFoundBody = "404 - Service Not Found",
    ListeningonPort = "Listening on Port",
    NotResponding = "Server did not response with any valid data",
    MongoDB_session_error = "Mongo session error",
    Closing_http_server = "Closing http server",
    Http_server_closed = "Http server closed"
}
export interface Proto_MongoDB_Interface {
    Connect_DB(): Promise<{
        code: Status;
        message: Status | string;
    }>;
    Disconnect_DB(): void;
    Define_Schema(data: any): mongoose.Schema<any>;
    Define_Model(schema_name: string, schema_definition: mongoose.Schema<any>, collection: any): mongoose.Model<mongoose.Document, {}>;
}
export interface ResultObj_Response_Interface {
    status: number;
    message: string;
    data: any;
}
export interface Helper_interface {
    generatemessage(status: number, message: string, data: any): ResultObj_Response_Interface;
    nullishcoalesce(data: any): any;
}
//# sourceMappingURL=helper.d.ts.map