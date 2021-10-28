import { Area } from "../Models/Area.model";
import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { User } from "../Models/User.model";
import userController from "./user.controller";

interface areaInterface {
    id: number
    name: string,
}

const createArea = async ({ name }: areaInterface) => {
    try {
        var area = new Area();
        area.name = name;
        return await getConnection().getRepository(Area).save(area)
    } catch (e) { throw (e) }
}

const updateArea = async ({
    id,
    name
}: areaInterface) => {
    try {
        const profileRepository = await getConnection().getRepository(Area);
        let updateArea = await profileRepository.findOne({ id: id });
        updateArea.name = name;
        let newProfile = await profileRepository.save(updateArea);
        return newProfile;
    }
    catch (e) {
        throw e;
    }
}

const getAllArea = async () => {
    try {
        const userRepository = await getConnection().getRepository(Area);
        return await userRepository.find({
            select: ["id", "name"],
            relations: ["user","admin_id","junction"]
        })
    } catch (e) {
        throw e;
    }
}

const getAreaById = async (id: number) => {
    try {
        const userRepository = await getConnection().getRepository(Area);
        return await userRepository.createQueryBuilder("area")
            .leftJoinAndSelect("area.user", "user")
            .leftJoinAndSelect("area.admin_id", "admin_id")
            .where("area.id = :id", { id: id })
            .getOne();
    } catch (e) {
        throw e;
    }
}

const deleteArea = async (id: number) => {
    try {
        const areaRepository = await getConnection().getRepository(Area);
        let areaRemove = await areaRepository.createQueryBuilder("area")
            .leftJoinAndSelect("area.user", "user")
            .where("area.id = :id", { id: id })
            .getOne();
        areaRemove.admin_id = null
        areaRemove.user = null
        areaRemove.junction = null
        let newProfile = await areaRepository.save(areaRemove);
        let resArea = await areaRepository.remove(areaRemove);
        return { ...resArea };

        // let resArea = await areaRepository.remove(areaRemove);

    } catch (e) {
        throw e;
    }
}


export default {
    createArea,
    getAllArea,
    getAreaById,
    updateArea,
    deleteArea,
}