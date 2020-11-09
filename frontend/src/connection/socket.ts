import io from "socket.io-client";

const URL = "http://localhost:3000";
const socket = io(URL);

let mySocketId;
// register preliminary event listeners here:

socket.on("createNewGame", (statusUpdate) => {
  mySocketId = statusUpdate.mySocketId;
});

export { socket, mySocketId };
