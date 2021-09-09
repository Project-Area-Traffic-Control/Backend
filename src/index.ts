import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser"


import "reflect-metadata";
import { createConnection, createConnections } from "typeorm";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

import "dotenv/config"
import config from "config";
import configureLibs from "./config";
import cookieParser from "cookie-parser";


import Routes from './Routes/index.route'
import LPR_DBController from './Controller/LPR_DB.controller';
import streamEvent from './streamEvent';
import alertHistoryController from './Controller/alertHistory.controller';



createConnection().then(async () => {

    const lprdb_list = await LPR_DBController.getAll_LPR_DB();
    console.log("DB is connected")
    for (let lprdb of lprdb_list) {
        try {
            await LPR_DBController.connect_mlpr_db(lprdb);
        } catch (e) {
            console.log("can't connect to ", lprdb.name)
        }
    }
}).catch(error => console.log(error));

const app: Application = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3001'],
        methods: ["GET", "SET"]
    }
});
streamEvent.setSocket(io);
alertHistoryController.setSocket(io);

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
app.use(cookieParser(config.get("cookies.secret")));
configureLibs(app);

app.use("/", Routes);

httpServer.listen(3000, () => {
    console.log(`server is running on PORT ${3000}`)
});


export default app;