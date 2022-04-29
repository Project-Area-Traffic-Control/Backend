import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser"


import "reflect-metadata";
import { createConnection, createConnections } from "typeorm";

import { createServer } from "http";
import { Server, Socket } from "socket.io";


import cookieParser from "cookie-parser";


import Routes from './Routes/index.route'
import junctionControlController from './Controller/junction.control.controller';
import cameraController from './Controller/camera.controller';
import { print } from 'util';


createConnection().then(async () => {
    console.log("DB is connected")
}).catch(error => console.log(error));

const app: Application = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        // origin: ['http://localhost:3001'],
        // methods: ["GET", "SET"],
        credentials: true,
        origin: true,
    }
});

const onConnection = (socket) => {
    console.log("socketIO connected")
    socket.on("camera1:recive", data => {
        // socket.emit("camera:send",data);
        cameraController.sendCamera(1,data)
        //console.log("camera recive : ",data);
    });
    socket.on("camera2:recive", data => {
        // socket.emit("camera:send",data);
        cameraController.sendCamera(2,data)
        //console.log("camera recive : ",data);
    });
    socket.on("camera3:recive", data => {
        // socket.emit("camera:send",data);
        cameraController.sendCamera(3,data)
        //console.log("camera recive : ",data);
    });
    socket.on("camera:select:web",data => {
        console.log("select : ",data)
        cameraController.emitSelect(data)
    })
  }

io.on("connect",(client) => {
    console.log("client connect : ",client.id)
    // io.on("setMode5", data => {
    //     console.log("camera");
    // });
})
io.on("connection",onConnection);




junctionControlController.setSocket(io);
cameraController.setSocket(io);

// app.use(cors(
//     {
//         origin: ['http://localhost:3001'],
//         credentials: true,
//         exposedHeaders: ["set-cookie"]
//     }
// ));

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cookieParser(config.get("cookies.secret")));
// configureLibs(app);

app.use("/", Routes);

httpServer.listen(3000, () => {
    console.log(`server is running on PORT ${3000}`)
});


export default app;