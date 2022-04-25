import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Channel } from "../Models/Channel.model";
import { Flashing, TypeName } from "../Models/Flashing.model";
import { Junction } from "../Models/Junction.model";
import { Phase } from "../Models/Phase.model";


interface flashingInterface {
    type: TypeName,
    junctionID: number,
    channelID: number,
    phaseID: number
}

const createFlashing = async ({
    type,
    junctionID,
    channelID,
    phaseID
}: flashingInterface) => {

    const flashing = new Flashing();
    flashing.type = type
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    let channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    let phase = await getConnection().getRepository(Phase).findOne({ id: phaseID })
    flashing.junction = junction
    flashing.channel = channel
    flashing.phase = phase
    return await getConnection().getRepository(Flashing).save(flashing);
}

const updateFlashing = async ({
    id,
    type,
    junctionID,
    channelID,
    phaseID
}) => {

    const flashingRepository = await getConnection().getRepository(Flashing);
    let updateFlashing = await flashingRepository.findOne({ id: id })
    updateFlashing.type = type
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    let channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    let phase = await getConnection().getRepository(Phase).findOne({ id: phaseID })
    updateFlashing.junction = junction
    updateFlashing.channel = channel
    updateFlashing.phase = phase
    // console.log(admin.area)
    // user.area = areaId
    return await getConnection().getRepository(Flashing).save(updateFlashing);
}

const getAllFlashing = async () => {
    try {
        const flashingRepository = await getConnection().getRepository(Flashing);
        return await flashingRepository.find({
            select: ["id", "type"],
            relations: ["junction", "channel", "phase"]
        })
    } catch (e) {
        throw e;
    }
}

const getFlashingById = async (uid: number) => {
    try {
        const flashingRepository = await getConnection().getRepository(Flashing);
        return await flashingRepository.createQueryBuilder("flashing")
            .leftJoinAndSelect("flashing.junction", "junction")
            .leftJoinAndSelect("flashing.channel", "channel")
            .leftJoinAndSelect("flashing.phase", "phase")
            .where("flashing.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

const deleteFlashing = async (uid: number) => {
    try {
        const flashingRepository = await getConnection().getRepository(Flashing);
        let flashingRemove = await flashingRepository.findOne({ id: uid });
        flashingRemove.channel = null
        flashingRemove.junction = null
        flashingRemove.phase = null
        let nullDetail = await flashingRepository.save(flashingRemove)
        let resFlashing = await flashingRepository.remove(flashingRemove);
        return { ...resFlashing };
    } catch (e) {
        throw e;
    }
}

export default {
    createFlashing,
    getAllFlashing,
    getFlashingById,
    updateFlashing,
    deleteFlashing
}