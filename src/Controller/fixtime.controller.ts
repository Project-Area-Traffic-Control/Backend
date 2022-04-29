import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Fixtime } from "../Models/Fixtime.model";
import { Junction } from "../Models/Junction.model";
import { Plan } from "../Models/Plan.model";

interface fixtimeInterface {
    start: Date,
    end: Date,
    junctionID: number,
    planID: number
}

const createFixtime = async ({
    start,
    end,
    junctionID,
    planID
}: fixtimeInterface) => {

    const fixtime = new Fixtime();
    fixtime.start = start
    fixtime.end = end
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    let plan = await getConnection().getRepository(Plan).findOne({ id: planID })
    fixtime.junction = junction
    fixtime.plan = plan
    return await getConnection().getRepository(Fixtime).save(fixtime);
}

const updateFixtime = async ({
    id,
    start,
    end,
    junctionID,
    planID
}) => {

    // const endDate = new Date(end)
    console.log("start : ", start, " end : ", end)
    // console.log("end : ", endDate.getHours())
    const fixtimeRepository = await getConnection().getRepository(Fixtime);
    let updateFixtime = await fixtimeRepository.findOne({ id: id })
    updateFixtime.start = start
    updateFixtime.end = end
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    let plan = await getConnection().getRepository(Plan).findOne({ id: planID })
    updateFixtime.junction = junction
    updateFixtime.plan = plan
    // console.log(admin.area)
    // user.area = areaId
    return await getConnection().getRepository(Fixtime).save(updateFixtime);
}

const deleteFixtime = async (uid: number) => {
    try {
        const fixtimeRepository = await getConnection().getRepository(Fixtime);
        let fixtimeRemove = await fixtimeRepository.findOne({ id: uid });
        fixtimeRemove.junction = null
        fixtimeRemove.plan = null
        let nullDetail = await fixtimeRepository.save(fixtimeRemove)
        let resFixtime = await fixtimeRepository.remove(fixtimeRemove);
        return { ...resFixtime };
    } catch (e) {
        throw e;
    }
}

const getAllFixtime = async () => {
    try {
        const fixtimeRepository = await getConnection().getRepository(Fixtime);
        return await fixtimeRepository.find({
            select: ["id", "start", "end"],
            relations: ["junction", "plan"]
        })
    } catch (e) {
        throw e;
    }
}

const getFixtimeById = async (uid: number) => {
    try {
        const fixtimeRepository = await getConnection().getRepository(Fixtime);
        return await fixtimeRepository.createQueryBuilder("fixtime")
            .leftJoinAndSelect("fixtime.junction", "junction")
            .leftJoinAndSelect("fixtime.plan", "plan")
            .where("fixtime.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}
const getFixtimeByJunctionID = async (id: number) => {
    try {
        const fixtimeRepository = await getConnection().getRepository(Fixtime);
        return await fixtimeRepository.createQueryBuilder("fixtime")
        .leftJoinAndSelect("fixtime.plan", "plan")
        .where("fixtime.junctionID = :id", { id: id })
        .orderBy('fixtime.start', 'ASC')
        .getMany();
    } catch (e) {
        throw e;
    }
}

export default {
    createFixtime,
    getAllFixtime,
    getFixtimeById,
    updateFixtime,
    deleteFixtime,
    getFixtimeByJunctionID
}