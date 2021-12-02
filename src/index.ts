import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser"


import "reflect-metadata";
import { createConnection, createConnections } from "typeorm";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

// import "dotenv/config"
// import config from "config";
// import configureLibs from "./config";
import cookieParser from "cookie-parser";


import Routes from './Routes/index.route'
import junctionControlController from './Controller/junction.control.controller';
// import LPR_DBController from './Controller/LPR_DB.controller';
// import streamEvent from './streamEvent';
// import alertHistoryController from './Controller/alertHistory.controller';



createConnection().then(async () => {
    console.log("DB is connected")
}).catch(error => console.log(error));

const app: Application = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3001'],
        methods: ["GET", "SET"]
    }
});

// io.on("connect",(client) => {
//     console.log("client connect : ",client.id)
// })

junctionControlController.setSocket(io);

app.use(cors(
    {
        origin: ['http://localhost:3001'],
        credentials: true,
        exposedHeaders: ["set-cookie"]
    }
));
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