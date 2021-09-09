import { getConnection, getRepository } from "typeorm";
import { Permission } from "../Models/Permission.model";
import { Role } from "../Models/Role.model";

interface roleInterface {
    id: number
    name: string,
    description: string
    permissions: Permission[]
}

const createRole = async ({ name, description, permissions }: roleInterface) => {
    try {
        var role = new Role();
        role.name = name;
        role.description = description;
        role.permissions = permissions

        await getConnection().getRepository(Permission).save(permissions);
        return await getConnection().getRepository(Role).save(role);
    } catch (e) { throw e; }
}

const getAllRole = async () => {
    try {
        const roleRepository = await getConnection().getRepository(Role);
        return await roleRepository.find({
            relations: ["permissions"]
        })
    } catch (e) { throw e; }
}
const getRoleByID = async (id: number) => {
    try {
        const roleRepository = await getConnection().getRepository(Role);
        return await roleRepository.findOne(id, {
            relations: ["permissions"]
        })
    } catch (e) { throw e; }
}
const updateRole = async ({ id, name, description }: roleInterface) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(Role)
            .set({ name: name, description: description })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e; }
}
const updatePermissionInRole = async ({ id, permissions }: roleInterface) => {
    try {
        const permissionRepository = await getConnection().getRepository(Permission);
        let rolePermission = await permissionRepository.createQueryBuilder("permission")
            .where("permission.roleId = :id", { id: id })
            .getMany();
        for (let item of rolePermission) {
            let i = permissions.map((data) => { return data.name }).indexOf(item.name);
            if (i < 0) continue;
            item.view = permissions[i].view;
            item.edit = permissions[i].edit
            item.delete = permissions[i].delete
        }
        return await getConnection().getRepository(Permission).save(rolePermission);
    } catch (e) { throw e; }
}

const deleteRole = async (id: number) => {
    try {
        const permissionRepository = await getConnection().getRepository(Permission);
        let rolePermission = await permissionRepository.createQueryBuilder("permission")
            .where("permission.roleId = :id", { id: id })
            .getMany();
        await permissionRepository.remove(rolePermission);
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Role)
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}

export default {
    createRole,
    getAllRole,
    getRoleByID,
    updateRole,
    updatePermissionInRole,
    deleteRole
}