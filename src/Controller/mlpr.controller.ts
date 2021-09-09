import e from "express";
import { reject } from "lodash";
import { connect } from "net";
import { Between, getConnection, getRepository, MoreThan, Not } from "typeorm";
import { License } from "../Models/License.model";
import { mlpr3 } from "../Models/mlpr/mlpr3.model";
import { mlpr3_mmr } from "../Models/mlpr/mlpr3_mmr.model";
import deviceController from "./device.controller";
import LPR_DBController from "./LPR_DB.controller";

export interface searchInterface {
    start: Date,
    end: Date,
    license: string,
    province: string,
    camera_name: string,
    model: string,
    color: string,
    category: string
}

const getDataBetweenDate = async (start: Date, end: Date) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        var data = []
        for (let connection of connections) {
            let mlprData = await connection.getRepository(mlpr3).find({
                relations: ["mlpr3_mmr"],
                where: {
                    DATETIME: Between(start, end)
                }
            })
            data.push(...mlprData)
        }
        return data;

    } catch (e) { throw e }
}
const getCountBetweenDate = async (start: Date, end: Date) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        var counts = 0;
        for (let connection of connections) {
            let count = await connection.getRepository(mlpr3).count({
                DATETIME: Between(start, end)
            })
            counts += count;
        }
        return counts;
    } catch (e) { throw e }
}
const getCountLicenseAlertBetweenDate = async (start: Date, end: Date, licenses: License[]) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        let counts = 0;
        let options = []
        // for await (let license of licenses) {
        //     options.push({ LICENSEPLATE: license.license, DATETIME: Between(start, end) });
        // }
        for (let connection of connections) {
            let count = 0;
            for await (let license of licenses) {
                count += await connection.getRepository(mlpr3).count({
                    where: {
                        DATETIME: Between(start, end),
                        LICENSEPLATE: license.license
                    }
                })
            }
            // let count = await connection.getRepository(mlpr3).count({
            //     where: options
            // })
            console.log(count, connection.name)
            counts += count;
        }
        return counts;
    } catch (e) { throw e }
}
const getLastData = async (limit: number) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        var data = []
        for (let connection of connections) {
            let mlprData = await connection.getRepository(mlpr3).find({
                relations: ["mlpr3_mmr"],
                order: { DATETIME: 'DESC' },
                take: limit
            })
            data.push(...mlprData);
        }
        return data.sort((a, b) => b.DATETIME - a.DATETIME).splice(0, limit);

    } catch (e) { throw e }
}
const getDataByCameraName = async (cameraName: string, limit: number) => {
    try {
        let camera = await deviceController.getDeviceByCameraName(cameraName);
        if (!camera) return Promise.reject({messese:`Not Found Camera ${cameraName}`})
        let connection = await LPR_DBController.getConnectionByName(camera.lpr_db.name);
        let option = {}
        if (limit) option = { take: limit }

        return await connection.getRepository(mlpr3).find({
            relations: ["mlpr3_mmr"],
            order: { DATETIME: 'DESC' },
            where: {
                CAMERA: cameraName,
            },
            ...option
        })

    } catch (e) { throw e }
}
const getDataByLicenseBetweenDate = async (license: string, provice: string, start: Date, end: Date) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        var options = {
            LICENSEPLATE: license,
            PROVINCE: provice
        }
        if (provice == null) {
            delete options.PROVINCE
        }

        var data = []
        for (let connection of connections) {
            let mlprData = await connection.getRepository(mlpr3).find({
                relations: ["mlpr3_mmr"],
                where: {
                    DATETIME: Between(start, end),
                    ...options
                }
            })
            data.push(...mlprData)
        }
        return data.sort((a, b) => a.DATETIME - b.DATETIME);
    } catch (e) { throw e }
}
const getDataWithFilter = async ({ start, end, license, province, camera_name, model, color, category }: searchInterface) => {
    try {
        const connections = await LPR_DBController.getAllConnection();

        var data = []
        for (let connection of connections) {
            var repo = connection.getRepository(mlpr3)
                .createQueryBuilder("mlpr3")
                .leftJoinAndSelect("mlpr3.mlpr3_mmr", "mlpr3_mmr")
                .where('mlpr3.DATETIME >= :start', { start: start })
                .andWhere('mlpr3.DATETIME <= :end', { end: end })

            if (license) repo = repo.andWhere("mlpr3.LICENSEPLATE = :license", { license: license });
            if (province) repo = repo.andWhere("mlpr3.PROVINCE = :province", { province: province });
            if (camera_name) repo = repo.andWhere("mlpr3.CAMERA = :camera_name", { camera_name: camera_name });

            if (model) repo = repo.andWhere("mlpr3_mmr.model = :model", { model: model });
            if (color) repo = repo.andWhere("mlpr3_mmr.color = :color", { color: color });
            if (category) repo = repo.andWhere("mlpr3_mmr.category = :category", { category: category });

            let mlprData = await repo.getMany();

            data.push(...mlprData)
        }
        return data.sort((a, b) => a.DATETIME - b.DATETIME);
    } catch (e) { throw e }
}


const getImageOverview = async (PID: string, camera_name: string) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        for (let connection of connections) {
            let mlprData = await connection.getRepository(mlpr3).findOne({
                select: ["IMAGE"],
                where: {
                    PID: PID,
                    CAMERA: camera_name
                }
            })
            if (mlprData != undefined) {
                let base64 = Buffer.from(mlprData.IMAGE, 'binary').toString('base64');
                mlprData.IMAGE = base64;
                return mlprData;
            }
        }
        return null;
    } catch (e) { throw e }
}
const getImageLicense = async (PID: string, camera_name: string) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        for (let connection of connections) {
            let mlprData = await connection.getRepository(mlpr3).findOne({
                select: ["PID"],
                where: {
                    PID: PID,
                    CAMERA: camera_name
                }
            })
            if (mlprData != undefined) {
                let data = await connection.getRepository(mlpr3_mmr).findOne(PID, {
                    select: ["image_lc"],
                })
                let base64 = Buffer.from(data.image_lc, 'binary').toString('base64');
                data.image_lc = base64;
                return data;
            }
        }
        return null;
    } catch (e) { throw e }
}
const getDetailDataByID = async (PID: string, camera_name: string) => {
    try {
        const connections = await LPR_DBController.getAllConnection();
        for (let connection of connections) {
            let mlprData = await connection.getRepository(mlpr3).findOne({
                select: ["PID"],
                where: {
                    PID: PID,
                    CAMERA: camera_name
                }
            })
            if (mlprData != undefined) {
                let data = await connection.getRepository(mlpr3_mmr).findOne(PID);
                return data;
            }
        }
        return null;
    } catch (e) { throw e }
}

export default {
    getCountBetweenDate,
    getCountLicenseAlertBetweenDate,
    getDataBetweenDate,
    getLastData,
    getDataByCameraName,
    getDataByLicenseBetweenDate,
    getDataWithFilter,
    getImageOverview,
    getImageLicense,
    getDetailDataByID
}