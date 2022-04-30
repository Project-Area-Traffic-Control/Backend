import { RoleName, User } from "../Models/User.model";
import { Profile } from "../Models/Profile.model";
import { createQueryBuilder, getConnection, getManager, Repository, SelectQueryBuilder } from "typeorm";
import { Area } from "../Models/Area.model";
import { add } from "lodash";
import { Permission } from "../Models/Permisssion.model";
export interface userInterface {
    username: string;
    password: string;
    areaId: number;
    permissionList: Permission[]
    role: RoleName
}

export interface userProfileInterface {
    uid: number;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    tel: string;
    image: string;
}

const createUser = async ({
    username,
    password,
    areaId,
    permissionList,
    role
}: userInterface) => {

    const user = new User();
    user.username = username
    user.password = password
    user.role = role
    var permissions = permissionList
    // for (let index = 0; index < permissionList.length; index++) {
    //     var permiss = new Permission()
    //     permiss.name = permissionList[index].name;
    //     permiss.view = permissionList[index].view ? permissionList[index].view : false;
    //     permiss.edit = permissionList[index].edit ? permissionList[index].edit : false;
    //     permiss.delete = permissionList[index].delete ? permissionList[index].delete : false;
    //     permiss.control = permissionList[index].control ? permissionList[index].control : false;
    //     permissions.push(permiss)
    // }
    // console.log(permissions)
    // user.permissions = permissions
    let permiss = await getConnection().getRepository(Permission).save(permissions);
    let area = await getConnection().getRepository(Area).findOne({ id: areaId })
    user.area = area
    user.permissions = permiss
    console.log(user.area)
    // user.area = areaId
    return await getConnection().getRepository(User).save(user);
}

const createUserProfile = async ({
    uid,
    firstname,
    lastname,
    email,
    address,
    tel,
    image
}: userProfileInterface) => {
    try {
        var profile = new Profile();
        profile.uid = uid;
        profile.email = email;
        profile.firstname = firstname;
        profile.lastname = lastname;
        profile.address = address;
        profile.tel = tel;
        profile.image = image;
        return await getConnection().getRepository(Profile).save(profile);
    }
    catch (e) {
        throw e;
    }
}

const updateUserProfile = async ({
    uid,
    firstname,
    lastname,
    email,
    address,
    tel,
    image
}: userProfileInterface) => {
    try {
        const profileRepository = await getConnection().getRepository(Profile);
        let updateProfile = await profileRepository.findOne({ uid: uid });
        if (updateProfile == undefined) {
            let newProfile = await createUserProfile({
                uid: uid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                address: address,
                tel: tel,
                image: image
            })
            return newProfile;
        } else {
            updateProfile.firstname = firstname;
            updateProfile.lastname = lastname;
            updateProfile.email = email;
            updateProfile.address = address;
            updateProfile.tel = tel;
            updateProfile.image = image;
            let newProfile = await profileRepository.save(updateProfile);
            return newProfile;
        }
    }
    catch (e) {
        throw e;
    }
}

const updateArea = async (
    uid: number,
    areaID: number,
) => {
    try {
        // console.log("update area");
        const profileRepository = await getConnection().getRepository(User);
        let updateArea = await profileRepository.findOne({ id: uid });
        if (areaID == null) {
            updateArea.area = null
        }
        else {
            const area = await getConnection().getRepository(Area).findOne({ id: areaID })
            updateArea.area = area;
        }

        let newArea = await profileRepository.save(updateArea);
        return newArea;

    }
    catch (e) {
        throw e;
    }
}

const updateRole = async (
    uid: number,
    role: RoleName,
) => {
    try {
        // console.log("update area");
        const userRepository = await getConnection().getRepository(User);
        let updateRole = await userRepository.findOne({ id: uid });
        if (role == null) {
            updateRole.role = null
        }
        else {
            updateRole.role = role
        }

        let newRole = await userRepository.save(updateRole);
        return newRole;

    }
    catch (e) {
        throw e;
    }
}

const deleteUser = async (uid: number) => {
    try {
        const profileRepository = await getConnection().getRepository(Profile);
        let profileRemove = await profileRepository.findOne({ uid: uid });
        if (profileRemove != undefined) await profileRepository.remove(profileRemove);
        const userRepository = await getConnection().getRepository(User);
        let nullArea = await userRepository.createQueryBuilder().update({ area: null });
        let userRemove = await userRepository.findOne({ id: uid });
        let resUser = await userRepository.remove(userRemove);
        return { ...resUser };
    } catch (e) {
        throw e;
    }
}

const getUserById = async (uid: number) => {
    try {
        const userRepository = await getConnection().getRepository(User);
        return await userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.permissions", "permissions")
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("user.area", "area")
            .where("user.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}

const getAllUser = async () => {
    try {
        const userRepository = await getConnection().getRepository(User);
        return await userRepository.find({
            select: ["id", "username", "create_time", "role"],
            relations: ["profile", "area", "permissions"]
        })
    } catch (e) {
        throw e;
    }
}

export default {
    createUser,
    createUserProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    getAllUser,
    updateArea,
    updateRole
};