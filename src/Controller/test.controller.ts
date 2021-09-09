import { createConnections, getConnection, getRepository } from "typeorm";
import { mlpr3_mmr } from "../Models/mlpr/mlpr3_mmr.model";
import fs from "fs"
import { License } from "../Models/License.model";

const testConnection = async () => {
    try {
        const connection = await getConnection("LPR_DB_2");


        var data = await connection.getRepository(mlpr3_mmr).findOne()
        // var imageBuffer = data.image_lc;
        // var imageName = 'test.jpg';

        // fs.createWriteStream(imageName).write(imageBuffer);
        // connection.close()
        return data
        // await db1Connection.forEach(async (obj) => {
        //     console.log(obj.name)
        //     // var data = await obj.getRepository(User)
        //     // console.log(data)
        // })
        // return await userRepository.find({
        //     select: ["id", "username", "create_time"],
        //     relations: ["profile", "role"]
        // })
    } catch (e) { throw e }
}

const getConnectionDB = async () => {
    try {
        // const LPR_DB_Repository = await getConnection().getRepository(LPR_DB);
        // var lpr_db = await LPR_DB_Repository.find();
        // console.log(lpr_db);
        return await createConnections([{
            name: "db1Connection",
            type: "mysql",
            host: "192.168.1.111",
            port: 3306,
            username: "test01",
            password: "test01",
            database: "lprdata",
            entities: ["src/Models/**/*.ts"],
            synchronize: false
        }]);
    } catch (e) { throw e }
}
const streamLicense = async () => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        const licenseStream = await licenseRepository
            .createQueryBuilder('license')
            .stream()
        setInterval(() => {
            licenseStream.on('result', data => {
                console.log("Trigger : ", data)
            })
        }, 1000)

    } catch (e) { throw e }
}

export default {
    testConnection,
    getConnectionDB,
    streamLicense
}