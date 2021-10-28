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

export default{
    createFixtime
}