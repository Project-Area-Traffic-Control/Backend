import { getConnection, getRepository } from "typeorm";
import { AlertHistory, StatusAlertHistory } from "../Models/AlertHistory.model";
import { Server } from "socket.io";
import { response } from "express";

var socket: Server;

const setSocket = (socketIO: Server) => {
    socket = socketIO;
}

interface alert_historys_interface {
    id: number
    license: string,
    province: string,
    isBlacklist: boolean,
    description: string
}

const createHistory = async ({ license, province, isBlacklist, description }: alert_historys_interface) => {
    try {
        var alertHistoryData = new AlertHistory();
        alertHistoryData.license = license;
        alertHistoryData.province = province;
        alertHistoryData.isBlacklist = isBlacklist;
        alertHistoryData.description = description
        alertHistoryData.status = StatusAlertHistory.UNACCEPT;
        return await getConnection().getRepository(AlertHistory).save(alertHistoryData);
    } catch (e) { throw e }
}
const getALLAlertHistory = async () => {
    try {
        const licenseRepository = await getConnection().getRepository(AlertHistory);
        return await licenseRepository.find({
            relations: ['user_accept', 'user_accept.profile'],
        });
    } catch (e) { throw e }
}
const getAlertHistory_UnAccept = async () => {
    try {
        const licenseRepository = await getConnection().getRepository(AlertHistory);
        return await licenseRepository.find({
            relations: ['user_accept', 'user_accept.profile'],
            where: {
                status: StatusAlertHistory.UNACCEPT
            }
        });
    } catch (e) { throw e }
}
const acceptLicenseAlert = async (id, uid) => {
    try {
        let response = await getConnection()
            .createQueryBuilder()
            .update(AlertHistory)
            .set({ status: StatusAlertHistory.ACCEPT, user_accept: uid })
            .where("id = :id", { id: id })
            .execute();
        socket.emit("acceptlicenseAlert", id);
        return response;
    } catch (e) { throw e }
}
export default {
    createHistory,
    getALLAlertHistory,
    getAlertHistory_UnAccept,
    acceptLicenseAlert,
    setSocket
}