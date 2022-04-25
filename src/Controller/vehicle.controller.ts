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
    // vehicle.create_time = create_time
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    let channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    let phase = await getConnection().getRepository(Phase).findOne({ id: phaseID })
    vehicle.channel = channel
    vehicle.phase = phase
    vehicle.junction = junction
    return await getConnection().getRepository(Vehicle).save(vehicle);
}

const getAllVehicleById = async (id: number) => {
    try {
        const vehicleRepository = await getConnection().getRepository(Vehicle);
        var res = []
        var list = []
        await vehicleRepository.find({
            select: ["id", "create_time"],
            relations: ["junction", "channel", "phase"]
        }).then((data) => {
            list = data
        })
        for (let index = 0; index < list.length; index++) {
            if (id == list[index].junction.id) {
                res.push(list[index])
            }
        }
        return await res
        // return await userRepository.createQueryBuilder("vehicle")
        //     .leftJoinAndSelect("vehicle.profile", "profile")
        //     .leftJoinAndSelect("vehicle.area", "area")
        //     .where("vehicle.id = :id", { id: id })
        //     .getOne();
    } catch (e) {
        throw e;
    }
}

const getTotalDateSearch = async ({
    start,
    end,
    junction_id
}) => {
    try {
        const vehicleRepository = await getConnection().getRepository(Vehicle);
        var res = []
        var list = []
        var count = 0
        await vehicleRepository.find({
            select: ["id", "create_time"],
            relations: ["junction", "channel", "phase"]
        }).then((data) => {
            list = data
        })
        console.log(junction_id)
        const startDate = new Date(start)
        const endDate = new Date(end)
        var date_list = []
        // console.log(new Date(start).toDateString())
        for (let index = 0; index < list.length; index++) {
            // if (list[index].create_time >= start || list[index].create_time <= end) {
            //     // res.push(list[index])
            //     count += 1
            // }
            if (list[index].junction.id == junction_id) {
                date_list.push(new Date(list[index].create_time))
            }
            // console.log(startDate.getTime())
            // console.log(list[index].create_time)
            // console.log(end)
        }
        for (let index = 0; index < date_list.length; index++) {
            if (date_list[index].getTime() >= startDate.getTime() && date_list[index].getTime() <= endDate.getTime()) {
                res.push(list[index])
            }
        }
        // console.log(res)
        return await res
        // return await userRepository.createQueryBuilder("vehicle")
        //     .leftJoinAndSelect("vehicle.profile", "profile")
        //     .leftJoinAndSelect("vehicle.area", "area")
        //     .where("vehicle.id = :id", { id: id })
        //     .getOne();
    } catch (e) {
        throw e;
    }
}

export default {
    createVehicle,
    getAllVehicleById,
    getTotalDateSearch
};