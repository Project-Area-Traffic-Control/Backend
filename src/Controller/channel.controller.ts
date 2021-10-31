import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Channel } from "../Models/Channel.model";
import { Junction } from "../Models/Junction.model";

interface channelInterface {
    name: string;
    number_lane: number,
    order: number,
    junctionID: number
}

const createChannel = async ({
    name,
    number_lane,
    order,
    junctionID
}: channelInterface) => {

    const channel = new Channel();
    channel.name = name
    channel.nunmber_lane = number_lane
    channel.order = order
    let junction = await getConnection().getRepository(Junction)
        .createQueryBuilder("junction")
        .leftJoinAndSelect("junction.area", "area")
        .leftJoinAndSelect("junction.channel", "channel")
        .where("junction.id = :id", { id: junctionID })
        .getOne();
    channel.junction = junction
    // console.log(admin.area)
    // user.area = areaId
    // console.log(junction.channel.length)
    if (junction.number_channel - junction.channel.length > 0) {
        return await getConnection().getRepository(Channel).save(channel);
    }
    else {
        junction.channel[0] = null
        for (let index = 1; index <= junction.channel.length; index++) {
            junction.channel[index - 1] = junction.channel[index]
        }
        let checkChannel = getConnection().getRepository(Junction).save(junction)
        return await getConnection().getRepository(Channel).save(channel);
    }
    // junction.number_channel -= 1
}

const updateChannel = async ({
    id,
    name,
    number_lane,
    order,
    junctionID
}) => {

    const ChannelRepository = await getConnection().getRepository(Channel);
    let updateChannel = await ChannelRepository.findOne({ id: id })
    updateChannel.name = name
    updateChannel.nunmber_lane = number_lane
    updateChannel.order = order
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    updateChannel.junction = junction
    // console.log(admin.area)
    // user.area = areaId
    return await getConnection().getRepository(Channel).save(updateChannel);
}

const deleteChannel = async (uid: number) => {
    try {
        const channelRepository = await getConnection().getRepository(Channel);
        let channelRemove = await channelRepository.findOne({ id: uid });
        channelRemove.junction = null
        channelRemove.phase = null
        channelRemove.flashing_plan = null
        let nullJunction = await channelRepository.save(channelRemove)
        let resChannel = await channelRepository.remove(channelRemove);
        return { ...resChannel };
    } catch (e) {
        throw e;
    }
}

const getAllChannel = async () => {
    try {
        const userRepository = await getConnection().getRepository(Channel);
        return await userRepository.find({
            select: ["id", "name", "nunmber_lane", "order"],
            relations: ["junction"]
        })
    } catch (e) {
        throw e;
    }
}

const getChannelById = async (uid: number) => {
    try {
        const userRepository = await getConnection().getRepository(Channel);
        return await userRepository.createQueryBuilder("channel")
            .leftJoinAndSelect("channel.junction", "junction")
            .where("channel.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

export default {
    createChannel,
    getAllChannel,
    getChannelById,
    updateChannel,
    deleteChannel
}