import { remove } from "lodash";
import { Server } from "socket.io";
import alertHistoryController from "./Controller/alertHistory.controller";
import deviceController from "./Controller/device.controller";
import licenseController from "./Controller/license.controller";
import { LPR_DB } from "./Models/LPR_DB.model";

const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

var socket: Server;

const setSocket = (socketIO: Server) => {
    socket = socketIO;
}

const onEventTrigger = (event) => {
    // console.log(event);
    let data = event.affectedRows[0].after;
    emitData(data)
    checkLicenseAlert(data)
}

const emitData = async (data) => {
    try {

        let device = await deviceController.getDeviceByCameraName(data.CAMERA);
        if (device == undefined) return false;
        if (data.IMAGE !== null) {
            var base64 = Buffer.from(data.IMAGE, 'binary').toString('base64');
            data.IMAGE = base64;
        }
        socket.emit(`Device${device.id}`, data)
    }
    catch (e) {
        console.log("Emit Catch : ", e)
    }
}

const checkLicenseAlert = async (data) => {
    try {
        let license = data.LICENSEPLATE;
        const licenseData = await licenseController.getLicenseActiveByLicensePlate(license);
        if (licenseData == undefined) return null;

        if (data.IMAGE !== null) {
            var base64 = Buffer.from(data.IMAGE, 'binary').toString('base64');
            data.IMAGE = base64;
        }

        let alert_historys_data = await alertHistoryController.createHistory({
            id: null,
            license: licenseData.license,
            province: licenseData.province,
            isBlacklist: licenseData.isBlacklist,
            description: licenseData.description
        });

        socket.emit('licenseAlert', { alert_history: alert_historys_data, mlpr: data });

    } catch (e) {
        console.log('CheckLicenseAlert Catch : ', e);
    }
};

const streamConnect = async (lprdb: LPR_DB) => {
    const connection = mysql.createConnection({
        host: lprdb.host,
        user: lprdb.username,
        password: lprdb.password,
        port: lprdb.port
    });
    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
    });

    instance.addTrigger({
        name: 'ON INSERT MLPR3',
        expression: 'lprdata.mlpr3',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: onEventTrigger,
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

    try {
        await instance.start();
    }
    catch (e) { throw e }
}

export default {
    streamConnect,
    setSocket
}