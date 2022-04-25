import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Phase, TypeName } from "../Models/Phase.model";
import { Channel } from "../Models/Channel.model";

interface phaseInterface {
    type: TypeName;
    port_number: number,
    channelID: number
}

const createPhase = async ({
    type,
    port_number,
    channelID
}: phaseInterface) => {

    const phase = new Phase();
    phase.type = type
    phase.port_number = port_number
    let channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    phase.channel = channel
    return await getConnection().getRepository(Phase).save(phase);
}

const updatePhase = async ({
    id,
    type,
    port_number,
    channelID
}) => {

    const ChannelRepository = await getConnection().getRepository(Phase);
    let updatePhase = await ChannelRepository.findOne({ id: id })
    updatePhase.type = type
    updatePhase.port_number = port_number
    let channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    updatePhase.channel = channel
    // console.log(admin.area)
    // user.area = areaId
    return await getConnection().getRepository(Phase).save(updatePhase);
}

const getAllPhase = async () => {
    try {
        const userRepository = await getConnection().getRepository(Phase);
        return await userRepository.find({
            select: ["id", "type", "port_number"],
            relations: ["channel"]
        })
    } catch (e) {
        throw e;
    }
}

const getPhaseById = async (uid: number) => {
    try {
        const userRepository = await getConnection().getRepository(Phase);
        return await userRepository.createQueryBuilder("phase")
            .leftJoinAndSelect("phase.channel", "channel")
            .where("phase.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

const deletePhase = async (uid: number) => {
    try {
        const phaseRepository = await getConnection().getRepository(Phase);
        let phaseRemove = await phaseRepository.findOne({ id: uid });
        phaseRemove.channel = null
        phaseRemove.flashing_plan = null
        let nullChannel = await phaseRepository.save(phaseRemove)
        let resPhase = await phaseRepository.remove(phaseRemove);
        return { ...resPhase };
    } catch (e) {
        throw e;
    }
}

export default {
    createPhase,
    getAllPhase,
    getPhaseById,
    updatePhase,
    deletePhase
}