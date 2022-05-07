import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Channel } from "../Models/Channel.model";
import { Junction } from "../Models/Junction.model";
import { Phase } from "../Models/Phase.model";
import { Vehicle } from "../Models/Vehicle.model";


interface vehicleInterface {
    create_time: Date
    junctionID: number
    channelID: number
    phaseID: number
}

const createVehicle = async ({
    create_time,
    junctionID,
    channelID,
    phaseID
}: vehicleInterface) => {
    var vehicle = new Vehicle();

    // vehicle.create_time = create_time
    var time = new Date(create_time)
    var junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    var channel = await getConnection().getRepository(Channel).findOne({ id: channelID })
    var phase = await getConnection().getRepository(Phase).findOne({ id: phaseID })

    vehicle.create_time = time
    vehicle.channel = channel
    vehicle.phase = phase
    vehicle.junction = junction

    let res = await getConnection().getRepository(Vehicle).save(vehicle);
    // console.log(res)
    return res
}

const getAllVehicleByJunctionId = async (id: number) => {
    try {
        // await deleteNull()
        const vehicleRepository = await getConnection().getRepository(Vehicle)
        return await vehicleRepository.find({
            select: ["id", "create_time"],
            relations: ["junction", "channel", "phase"],
            where: {
                junction: id
            }
            
        })
    } catch (e) {
        throw e;
    }
}

const deleteVehicle = async (uid: number) => {
    try {
        // await deleteNull()
        console.log(uid)
        const vehicleRepository = await getConnection().getRepository(Vehicle);
        let vehicleRemove = await vehicleRepository.findOne({ id: uid });
        vehicleRemove.junction = null
        vehicleRemove.phase = null
        vehicleRemove.channel = null
        let nullJunction = await vehicleRepository.save(vehicleRemove)
        let resVehicle = await vehicleRepository.remove(vehicleRemove);
        return { ...resVehicle };
    } catch (e) {
        throw e;
    }
}

const deleteNull = async () => {
    try {
        // console.log('delete null')
        const vehicleRepository = await getConnection().getRepository(Vehicle);
        var res = []
        var list = []
        await vehicleRepository.find({
            select: ["id", "create_time"],
            relations: ["junction", "channel", "phase"]
        }).then((data) => {
            list = data
        })
        // console.log(list)
        for (let index = 0; index < list.length; index++) {
            if (list[index].create_time == 'Invalid Date') {
                // console.log(list[index])
                deleteVehicle(list[index].id)
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

const getAllVehicleByChannelId = async (id: number) => {
    try {
        // await deleteNull()
        const vehicleRepository = await getConnection().getRepository(Vehicle);
        return await vehicleRepository.find({
            select: ["id", "create_time"],
            relations: ["junction", "channel", "phase"],
            where: {
                channel: id
            }
        })
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
        var list = await getAllVehicleByJunctionId(junction_id)
        var count = 0
        // await vehicleRepository.find({
        //     select: ["id", "create_time"],
        //     relations: ["junction", "channel", "phase"]
        // }).then((data) => {
        //     list = data
        // })
        // console.log(list[list.length - 1])
        const startDate = new Date(start)
        const endDate = new Date(end)
        var date_list = []
        // console.log(new Date(start).toDateString())
        // for (let index = 0; index < list.length; index++) {
        //     // if (list[index].create_time >= start || list[index].create_time <= end) {
        //     //     // res.push(list[index])
        //     //     count += 1
        //     // }
        //     if (list[index].junction.id == junction_id) {
        //         if (list[index].create_time != 'Invalid Date') {
        //             console.log(list[index].create_time)
        //             date_list.push(new Date(list[index].create_time))
        //         }
        //     }
        //     // console.log(startDate.getTime())
        //     // console.log(list[index].create_time)
        //     // console.log(end)
        // }
        for (let index = 0; index < list.length; index++) {
            if (list[index].create_time != null) {
                var tempDate = new Date(list[index].create_time)
                // console.log(tempDate.getTime() + " = " + endDate.getTime())
                if (tempDate.getTime() >= startDate.getTime() && tempDate.getTime() <= endDate.getTime()) {
                    res.push(list[index])
                    // console.log("test")
                }
            }

        }
        // console.log("res: ", res)
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
    getAllVehicleByJunctionId,
    getAllVehicleByChannelId,
    getTotalDateSearch,
    deleteVehicle,
    deleteNull
};