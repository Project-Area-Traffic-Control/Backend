import { Console } from "console";
import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Area } from "../Models/Area.model";
import { Junction } from "../Models/Junction.model";

interface junctionInterface {
    id: number
    name: string;
    latitude: number;
    longitude: number,
    number_channel: number,
    areaId: number
}

const createJunction = async ({
    name,
    latitude,
    longitude,
    number_channel,
    areaId
}: junctionInterface) => {

    const junction = new Junction();
    junction.name = name
    junction.latitude = latitude
    junction.longitude = longitude
    junction.number_channel = number_channel
    let area = await getConnection().getRepository(Area).findOne({ id: areaId })
    junction.area = area
    // console.log(admin.area)
    // user.area = areaId
    return await getConnection().getRepository(Junction).save(junction);
}

const getAllJunction = async () => {
    try {
        const userRepository = await getConnection().getRepository(Junction);
        return await userRepository.find({
            select: ["id", "name", "latitude", "longitude", "number_channel"],
            relations: ["area", "channel"]
        })
    } catch (e) {
        throw e;
    }
}

const getJunctionById = async (uid: number) => {
    try {
        const userRepository = await getConnection().getRepository(Junction);
        return await userRepository.createQueryBuilder("junction")
            .leftJoinAndSelect("junction.area", "area")
            .leftJoinAndSelect("junction.channel", "channel")
            .where("junction.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

const updateJunction = async ({
    id,
    name,
    latitude,
    longitude,
    number_channel,
    areaId
}: junctionInterface) => {
    console.log(latitude, " ", longitude)
    let area = await getConnection().getRepository(Area).findOne({ id: areaId })
    // console.log(admin.area)
    // user.area = areaId
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(Junction)
            .set({ name: name, latitude: latitude, longitude: longitude, area: area, number_channel: number_channel })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}

const deleteJunction = async (uid: number) => {
    try {
        const junctionRepository = await getConnection().getRepository(Junction);
        let junctionRemove = await junctionRepository.findOne({ id: uid });
        junctionRemove.area = null
        junctionRemove.channel = null
        junctionRemove.flashing_plan = null
        junctionRemove.fixtime_plan = null
        junctionRemove.plan = null
        let nullArea = await junctionRepository.save(junctionRemove)
        let resJunction = await junctionRepository.remove(junctionRemove);
        return { ...resJunction };
    } catch (e) {
        throw e;
    }
}

export default {
    createJunction,
    getAllJunction,
    getJunctionById,
    updateJunction,
    deleteJunction
}