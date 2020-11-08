"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status[Status["Success"] = 200] = "Success";
    Status[Status["NotFound"] = 404] = "NotFound";
    Status[Status["ServerError"] = 500] = "ServerError";
    Status[Status["Unavailable"] = 503] = "Unavailable";
    Status[Status["BADREQUEST"] = 400] = "BADREQUEST";
    Status["BADREQUESTMessage"] = "Bad Request";
    Status["ServerErrorMessage"] = "Server Error";
    Status["SuccessMessage"] = "Success";
    Status["ErrorMessage"] = "Error";
    Status["WebServerTitle"] = "Web Server";
    Status["WebServerBody"] = "Microservice Web Server";
    Status["PageNotFoundTitlte"] = "Service Not Found";
    Status["PageNotFoundBody"] = "404 - Service Not Found";
    Status["ListeningonPort"] = "Listening on Port";
    Status["NotResponding"] = "Server did not response with any valid data";
    Status["MongoDB_session_error"] = "Mongo session error";
    Status["Closing_http_server"] = "Closing http server";
    Status["Http_server_closed"] = "Http server closed";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=helper.js.map