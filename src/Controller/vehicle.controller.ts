import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Channel } from "../Models/Channel.model";
import { Junction } from "../Models/Junction.model";
import { Phase } from "../Models/Phase.model";
import { Vehicle } from "../Models/Vehicle.model";

interface vehicleInterface {
    junctionID: number
    channelID: number
    phaseID: number
}

const createVehicle = async ({
    junctionID,
    channelID,
    phaseID
}: vehicleInterface) => {

    const vehicle = new Vehicle();
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID})
    let channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    let phase = await getConnection().getRepository(Phase).findOne({ id: phaseID})
    vehicle.channel = channel
    vehicle.phase = phase
    vehicle.junction = junction
    return await getConnection().getRepository(Phase).save(phase);
}

export default {
    createVehicle,
};