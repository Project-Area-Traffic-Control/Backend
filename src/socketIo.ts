import { Server } from "socket.io";

var socketIO: Server;
var set = false

const setSocket = (socket: Server) => {
    socketIO = socket;
    set = true
    console.log("Set socketIO in Socket control");

}

const main = () => {
    socketIO.on("connect",(client) => {
        console.log("client connect : ",client.id)
    })

    socketIO.on(`update:setting`,(data)=> {
        console.log('update setting ',data)
        socketIO.emit(`update:setting`,data)
    })
    
}




// const onConnection = (socket) => {
//     console.log("socketIO connected")
//     socket.on("camera1:recive", data => {
//         // socket.emit("camera:send",data);
//         cameraController.sendCamera(1,data)
//         //console.log("camera recive : ",data);
//     });
//     socket.on("camera2:recive", data => {
//         // socket.emit("camera:send",data);
//         cameraController.sendCamera(2,data)
//         //console.log("camera recive : ",data);
//     });
//     socket.on("camera3:recive", data => {
//         // socket.emit("camera:send",data);
//         cameraController.sendCamera(3,data)
//         //console.log("camera recive : ",data);
//     });
//     socket.on("camera:select:web",data => {
//         console.log("select : ",data)
//         cameraController.emitSelect(data)
//     })
//   }

//   socketIO.on("connection",onConnection);





export default {
    setSocket
}