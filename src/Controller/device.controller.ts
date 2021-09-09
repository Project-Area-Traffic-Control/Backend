import { getConnection, getRepository } from "typeorm";
import { Device } from "../Models/Device.model";

interface DeviceInterface {
    id: number,
    name: string,
    description: string,
    ip: string,
    locationId: number,
    lpr_db_id: number
}

const createDevice = async ({ name, description, ip, locationId, lpr_db_id }: DeviceInterface) => {
    try {
        var device = new Device();
        device.name = name
        device.description = description;
        device.ip = ip;
        device.location = locationId;
        device.lpr_db = lpr_db_id;

        return await getConnection().getRepository(Device).save(device);
    } catch (e) { throw e }
}
const getAllDevice = async () => {
    try {
        const DeviceRepository = await getConnection().getRepository(Device);
        return await DeviceRepository.find({
            relations: ["location", "lpr_db"]
        });
    } catch (e) { throw e }
}
const getDeviceByID = async (id: number) => {
    try {
        const DeviceRepository = await getConnection().getRepository(Device);
        return await DeviceRepository.createQueryBuilder("device")
            .leftJoinAndSelect("device.location", "location")
            .leftJoinAndSelect("device.lpr_db", "lpr_db")
            .where("device.id = :id", { id: id })
            .getOne();
    } catch (e) { throw e }
}
const updateDevice = async ({ id, name, description, ip, locationId, lpr_db_id }: DeviceInterface) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(Device)
            .set({ name: name, description: description, ip: ip, location: locationId, lpr_db: lpr_db_id })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const deleteDevice = async (id: number) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Device)
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const getDeviceByCameraName = async (cameraName: string) => {
    try {
        const DeviceRepository = await getConnection().getRepository(Device);
        return await DeviceRepository.createQueryBuilder("device")
            .leftJoinAndSelect("device.location", "location")
            .leftJoinAndSelect("device.lpr_db", "lpr_db")
            .where("device.name = :name", { name: cameraName })
            .getOne();
    } catch (e) { throw e }
}
export default {
    createDevice,
    getAllDevice,
    getDeviceByID,
    updateDevice,
    deleteDevice,
    getDeviceByCameraName
}

