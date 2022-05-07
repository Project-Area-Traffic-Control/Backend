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
import socketIo from './socketIo';


createConnection().then(async () => {
    console.log("DB is connected")
}).catch(error => console.log(error));

const app: Application = express()
const httpServer = createServer(app);
const io1 = require('socket.io')(httpServer, {
    path: '/socket',
    cors: {
        // origin: ['http://localhost:3001'],
        // methods: ["GET", "SET"],
        credentials: true,
        origin: true,
    }
  });
const io2 = require('socket.io')(httpServer, {
    cors: {
        credentials: true,
        origin: true,
    }
});
// const io = new Server(httpServer, {
//     cors: {
//         // origin: ['http://localhost:3001'],
//         // methods: ["GET", "SET"],
//         credentials: true,
//         origin: true,
//     }
// });




socketIo.setSocket(io1,io2)
junctionControlController.setSocket(io2);
// cameraController.setSocket(io1);



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