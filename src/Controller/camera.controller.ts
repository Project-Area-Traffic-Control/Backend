import { Server } from "socket.io";

var socketIO: Server;

const setSocket = (socket: Server) => {
    socketIO = socket;
    console.log("Set socketIO in camera control");
}

const sendCamera = (id,data) => {
    socketIO.emit(`camera${id}:send`,data)
}

const emitSelect = (data) => {
    socketIO.emit("camera:select:pi",data)
}


export default {
    setSocket,
    sendCamera,
    emitSelect
}