import { getConnection, getRepository } from "typeorm";
import { Location } from "../Models/Location.model";

interface locationInterface {
    id: number
    name: string,
    latitude: number,
    longgitude: number,
}

const createLocation = async ({ name, latitude, longgitude }: locationInterface) => {
    try {
        var location = new Location();
        location.name = name;
        location.latitude = latitude;
        location.longgitude = longgitude;

        return await getConnection().getRepository(Location).save(location);
    } catch (e) { throw e }
}
const getAllLocation = async () => {
    try {
        const locationRepository = await getConnection().getRepository(Location);
        return await locationRepository.find({
            relations: ["device"]
        });
    } catch (e) { throw e }
}
const getLocationByID = async (id: number) => {
    try {
        const locationRepository = await getConnection().getRepository(Location);
        return await locationRepository.createQueryBuilder("location")
            .leftJoinAndSelect("location.device", "device")
            .where("location.id = :id", { id: id })
            .getOne();
    } catch (e) { throw e }
}
const updateLocation = async ({ id, name, latitude, longgitude }: locationInterface) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(Location)
            .set({ name: name, latitude: latitude, longgitude: longgitude })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const deleteLocation = async (id: number) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Location)
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}

export default {
    createLocation,
    getAllLocation,
    getLocationByID,
    updateLocation,
    deleteLocation
}

