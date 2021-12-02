import { Server } from "socket.io";

var socketIO: Server;

const setSocket = (socket: Server) => {
    socketIO = socket;
    console.log("Set socketIO in junction control");
}
const setMode = (junction_id, mode) => {
    socketIO.emit(`setMode${junction_id}`,
        {
            "mode": mode
        }
    )
}
const setPhase = (junction_id, phase) => {
    socketIO.emit(`setPhase${junction_id}`,
    {
        "phase": phase
    }
)
}

export default {
    setSocket,
    setMode,
    setPhase
}