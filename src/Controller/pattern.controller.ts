import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Pattern, PatternName } from "../Models/Pattern.model";
import { Plan } from "../Models/Plan.model";

interface patternInterface {
    patternName: PatternName,
    order: number,
    duration: number,
    planID: number
}

const createPattern = async ({
    patternName,
    order,
    duration,
    planID
}: patternInterface) => {

    const pattern = new Pattern();
    pattern.pattern = patternName
    pattern.order = order
    pattern.duration = duration
    let plan = await getConnection().getRepository(Plan).findOne({ id: planID })
    console.log(plan)
    pattern.plan = plan
    return await getConnection().getRepository(Pattern).save(pattern);
}

const updatePattern = async ({
    id,
    patternName,
    order,
    duration,
    planID
}) => {

    const patternRepository = await getConnection().getRepository(Pattern);
    let updatePattern = await patternRepository.findOne({ id: id })
    updatePattern.pattern = patternName
    updatePattern.order = order
    updatePattern.duration = duration
    let plan = await getConnection().getRepository(Plan).findOne({ id: planID })
    updatePattern.plan = plan
    return await getConnection().getRepository(Pattern).save(updatePattern);
}

const deletePattern = async (uid: number) => {
    try {
        const patternRepository = await getConnection().getRepository(Pattern);
        let patternRemove = await patternRepository.findOne({ id: uid });
        patternRemove.plan = null
        let nullDetail = await patternRepository.save(patternRemove)
        let resRemove = await patternRepository.remove(patternRemove);
        return { ...resRemove };
    } catch (e) {
        throw e;
    }
}

const getAllPattern = async () => {
    try {
        const planRepository = await getConnection().getRepository(Pattern);
        return await planRepository.find({
            select: ["id", "pattern", "order", "duration"],
            relations: ["plan"]
        })
    } catch (e) {
        throw e;
    }
}

const getPatternById = async (uid: number) => {
    try {
        const patternRepository = await getConnection().getRepository(Pattern);
        return await patternRepository.createQueryBuilder("pattern")
            .leftJoinAndSelect("pattern.plan", "plan")
            .where("pattern.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

export default {
    createPattern,
    getAllPattern,
    getPatternById,
    updatePattern,
    deletePattern
}