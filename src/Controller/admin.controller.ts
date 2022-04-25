import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
import { Admin } from "../Models/Admin.model";
import { Area } from "../Models/Area.model";

interface adminInterface {
    email: string;
    password: string;
    firstname: string,
    lastname: string,
    address: string,
    tel: string,
    image: string,
    areaId: number
}

const createAdmin = async ({
    email,
    password,
    firstname,
    lastname,
    address,
    tel,
    image,
    areaId
}: adminInterface) => {

    const admin = new Admin();
    admin.email = email
    admin.password = password
    admin.firstname = firstname
    admin.lastname = lastname
    admin.address = address
    admin.tel = tel
    admin.image = image
    let area = await getConnection().getRepository(Area).findOne({ id: areaId })
    admin.area = area
    console.log(admin.area)
    // user.area = areaId
    return await getConnection().getRepository(Admin).save(admin);
}

const updateAdminProfile = async ({
    uid,
    firstname,
    lastname,
    areaId,
    address,
    tel,
    image
}) => {
    try {
        const profileRepository = await getConnection().getRepository(Admin);
        let updateAdmin = await profileRepository.findOne({ id: uid });
        updateAdmin.firstname = firstname;
        updateAdmin.lastname = lastname;
        let area = await getConnection().getRepository(Area).findOne({ id: areaId })
        updateAdmin.area = area
        updateAdmin.address = address;
        updateAdmin.tel = tel;
        updateAdmin.image = image;
        let newProfile = await profileRepository.save(updateAdmin);
        return newProfile;

    }
    catch (e) {
        throw e;
    }
}

const deleteAdmin = async (uid: number) => {
    try {
        const adminRepository = await getConnection().getRepository(Admin);
        let nullArea = await adminRepository.findOne({ id: uid })
        nullArea.area = null
        let newProfile = await adminRepository.save(nullArea);
        let adminRemove = await adminRepository.findOne({ id: uid });
        let resAdmin = await adminRepository.remove(adminRemove)
        // let resAdmin = await adminRepository.remove(adminRemove);
        return { ...resAdmin };
    } catch (e) {
        throw e;
    }
}

const getAdminById = async (uid: number) => {
    try {
        const adminRepository = await getConnection().getRepository(Admin);
        return await adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect("admin.area", "area")
            .where("admin.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

const getAllAdmin = async () => {
    try {
        const adminRepository = await getConnection().getRepository(Admin);
        return await adminRepository.find({
            select: ["id", "email", "create_time", "firstname", "lastname", "address", "tel", "image"],
            relations: ["area"]
        })
    } catch (e) {
        throw e;
    }
}

export default {
    createAdmin,
    getAllAdmin,
    getAdminById,
    deleteAdmin,
    updateAdminProfile
};