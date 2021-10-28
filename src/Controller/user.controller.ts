import { User } from "../Models/User.model";
import { Profile } from "../Models/Profile.model";
import { createQueryBuilder, getConnection, getManager, Repository, SelectQueryBuilder } from "typeorm";
import { Area } from "../Models/Area.model";
import { add } from "lodash";
export interface userInterface {
    username: string;
    password: string;
    areaId: number;
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
    areaId
}: userInterface) => {

    const user = new User();
    user.username = username
    user.password = password
    let area = await getConnection().getRepository(Area).findOne({ id: areaId })
    user.area = area
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
            select: ["id", "username", "create_time"],
            relations: ["profile", "area"]
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
    updateArea
};