import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Junction } from "../Models/Junction.model";
import { Plan } from "../Models/Plan.model";

interface planInterface {
    name: string,
    yellow_time: number,
    delay_red_time: number,
    junctionID: number
}

const createPlan = async ({
    name,
    yellow_time,
    delay_red_time,
    junctionID
}: planInterface) => {

    const plan = new Plan();
    plan.name = name
    plan.yellow_time = yellow_time
    plan.delay_red_time = delay_red_time
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    plan.junction = junction
    return await getConnection().getRepository(Plan).save(plan);
}

const updatePlan = async ({
    id,
    name,
    yellow_time,
    delay_red_time,
    junctionID
}) => {

    const planRepository = await getConnection().getRepository(Plan);
    let updatePlan = await planRepository.findOne({ id: id })
    updatePlan.name = name
    updatePlan.yellow_time = yellow_time
    updatePlan.delay_red_time = delay_red_time
    let junction = await getConnection().getRepository(Junction).findOne({ id: junctionID })
    updatePlan.junction = junction
    return await getConnection().getRepository(Plan).save(updatePlan);
}

const deletePlan = async (uid: number) => {
    try {
        const planRepository = await getConnection().getRepository(Plan);
        let planRemove = await planRepository.findOne({ id: uid });
        planRemove.junction = null
        planRemove.pattern = null
        let nullDetail = await planRepository.save(planRemove)
        let resRemove = await planRepository.remove(planRemove);
        return { ...resRemove };
    } catch (e) {
        throw e;
    }
}

const getAllPlan = async () => {
    try {
        const planRepository = await getConnection().getRepository(Plan);
        return await planRepository.find({
            select: ["id", "name", "yellow_time", "delay_red_time"],
            relations: ["junction"]
        })
    } catch (e) {
        throw e;
    }
}

const getPlanById = async (uid: number) => {
    try {
        const planRepository = await getConnection().getRepository(Plan);
        return await planRepository.createQueryBuilder("plan")
            .leftJoinAndSelect("plan.junction", "junction")
            .leftJoinAndSelect("plan.pattern", "pattern")
            .where("plan.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

export default {
    createPlan,
    getAllPlan,
    getPlanById,
    updatePlan,
    deletePlan,
}