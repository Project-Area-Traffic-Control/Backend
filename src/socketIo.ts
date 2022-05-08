import { Server } from "socket.io";
import { print } from "util";

var socket1
var socket2


var socket_machine = []

const setSocket = (socket1:Server ,socket2:Server ) => {
    socket1 = socket1;
    socket2 = socket2
    
    console.log("Set socketIO in Socket control");

    //client
    socket1.on("connect",(Socket) => {
        console.log('Connect 1')

        Socket.on(`update:setting`,(data)=> {
            console.log('update setting ',data)
            socket2.emit('update:setting',data)
        })
        Socket.on(`get:data`,(junction_id)=>{
            socket2.emit('get:data',junction_id)
        })
        Socket.on(`set:mode`,(data)=>{
            console.log('set:mode')
            socket2.emit('set:mode',data)
        })
        // data = {'junction_id','mode'}
        Socket.on(`set:phase`,(data)=>{
            console.log('set:phase')
            socket2.emit('set:phase',data)
        })
        // data = {'junction_id','phase'}
    })


    //socket_machine
    socket2.on("connect",(Socket) => {
        
        Socket.on('update:phase',(data)=>{
            // console.log('update phase ',data)
            socket1.emit(`update:phase:${data.junction_id}`,data.phase)

            socket2.emit(`set:phase:sim`,data)
        })
        Socket.on('update:mode',(data)=>{
            // console.log('update mode ',data)
            socket1.emit(`update:mode:${data.junction_id}`,data.mode)

            socket2.emit(`set:mode:sim`,data)
        })
        Socket.on('update:timer',(data)=>{
            // console.log('update timer ',data)
            socket1.emit(`update:timer:${data.junction_id}`,data.timer)
        })
        Socket.on(`update:data`,(data)=>{
            socket1.emit(`update:data:${data.junction_id}`,data)
        })
    })
}




// const socket = (socket) => {

//     socket.on(`update:setting`,(data)=> {
//         console.log('update setting ',data)
//         socket.emit(`update:setting`,data)
//     })

// }




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