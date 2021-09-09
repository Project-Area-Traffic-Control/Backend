import { createConnections, getConnection, getRepository } from "typeorm";
import { LPR_DB } from "../Models/LPR_DB.model";
import streamEvent from "../streamEvent";

interface LPR_DB_Interface {
    id: number
    username: string,
    password: string,
    name: string,
    type: string,
    host: string,
    port: number,
    database: string
}

const create_LPR_DB = async ({ username, password, name, type, host, port, database }: LPR_DB_Interface) => {
    try {
        var lpr_db = new LPR_DB();
        lpr_db.username = username;
        lpr_db.password = password;
        lpr_db.name = name;
        lpr_db.type = type;
        lpr_db.host = host;
        lpr_db.port = port;
        lpr_db.database = database;

        return await getConnection().getRepository(LPR_DB).save(lpr_db);

    } catch (e) { throw e }
}
const getAll_LPR_DB = async () => {
    try {
        const LPR_DB_Repository = await getConnection().getRepository(LPR_DB);
        return await LPR_DB_Repository.find({
            relations: ["device"]
        });
    } catch (e) { throw e }
}
const get_LPR_DB_ByID = async (id: number) => {
    try {
        const LPR_DB_Repository = await getConnection().getRepository(LPR_DB);
        return await LPR_DB_Repository.createQueryBuilder("lpr_db")
            .leftJoinAndSelect("lpr_db.device", "device")
            .where("lpr_db.id = :id", { id: id })
            .getOne();
    } catch (e) { throw e }
}
const update_LPR_DB = async ({ id, username, password, name, type, host, port, database }: LPR_DB_Interface) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(LPR_DB)
            .set({ username: username, password: password, name: name, type: type, host: host, port: port, database: database })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const delete_LPR_DB = async (id: number) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(LPR_DB)
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const connect = async (lprdb: LPR_DB) => {
    try {
        var connections = await createConnections([{
            name: lprdb.name,
            type: "mysql",
            host: lprdb.host,
            port: lprdb.port,
            username: lprdb.username,
            password: lprdb.password,
            database: lprdb.database,
            entities: ["src/Models/mlpr/*.ts"],
            synchronize: false
        }])
        console.log(lprdb.name, "is connected");
        try {
            streamEvent.streamConnect(lprdb);
        }
        catch (e) {
            console.log(e);
        }
        return connections.pop();
    } catch (e) {
        console.log("Can't connect to", lprdb.name)
        return null;
    }
}
const connect_mlpr_db = async (lprdb: LPR_DB) => {
    try {
        const connection = await getConnection(lprdb.name);
        if (connection.isConnected) return connection;
        else { return await connect(lprdb); }
    } catch {
        return await connect(lprdb)
    }
}
const getAllConnection = async () => {
    const lprdb_list = await getAll_LPR_DB();
    var connections = [];
    for (let lprdb of lprdb_list) {
        try {
            let connection = await getConnection(lprdb.name);
            if (connection.isConnected) connections.push(connection);
            else {
                let newConnection = await connect_mlpr_db(lprdb);
                if (newConnection != null) connections.push(newConnection);
            }
        } catch {
            let newConnection = await connect_mlpr_db(lprdb);
            if (newConnection != null) connections.push(newConnection);
        }
    }
    return connections;
}
const getConnectionByName = async (name: string) => {
    try {
        let connection = await getConnection(name);
        if (connection.isConnected) return connection;
        else return null
    } catch (e) { throw e }
}
export default {
    create_LPR_DB,
    getAll_LPR_DB,
    get_LPR_DB_ByID,
    update_LPR_DB,
    delete_LPR_DB,
    connect_mlpr_db,
    getAllConnection,
    getConnectionByName
}

