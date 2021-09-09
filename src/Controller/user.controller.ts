import { User } from "../Models/User.model";
import { Profile } from "../Models/Profile.model";
import { createQueryBuilder, getConnection, getManager, Repository } from "typeorm";
// import memberControllers from "../memberControllers/member.controller"
// import { use } from "passport";

export interface createUser {
    username: string;
    password: string;
    roleID: number;
}

export interface userProfileInterface {
    uid: number;
    firstname: string;
    lastname: string;
    email: string;
}


async function createUser({
    username,
    password,
    roleID
}: createUser) {

    const user = new User();
    user.username = username
    user.password = password
    user.role = roleID
    return await getConnection().getRepository(User).save(user);
}

async function createUserProfile({
    uid,
    firstname,
    lastname,
    email
}: userProfileInterface) {
    try {
        var profile = new Profile();
        profile.uid = uid;
        profile.email = email;
        profile.firstname = firstname;
        profile.lastname = lastname;

        return await getConnection().getRepository(Profile).save(profile);
    }
    catch (e) {
        throw e;
    }
}
async function updateUserProfile({
    uid,
    firstname,
    lastname,
    email
}: userProfileInterface) {
    try {
        const profileRepository = await getConnection().getRepository(Profile);
        let updateProfile = await profileRepository.findOne({ uid: uid });
        if (updateProfile == undefined) {
            let newProfile = await createUserProfile({
                uid: uid,
                firstname: firstname,
                lastname: lastname,
                email: email
            })
            return newProfile;
        } else {
            updateProfile.firstname = firstname;
            updateProfile.lastname = lastname;
            updateProfile.email = email;
            let newProfile = await profileRepository.save(updateProfile);
            return newProfile;
        }
    }
    catch (e) {
        throw e;
    }
}

async function updateRole(id: number, role: number) {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ role: role })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}

async function updatePassword(id: number, newPass: string) {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ password: newPass })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}

async function deleteUser(uid: number) {
    try {
        const profileRepository = await getConnection().getRepository(Profile);
        let profileRemove = await profileRepository.findOne({ uid: uid });

        if (profileRemove != undefined) await profileRepository.remove(profileRemove);

        const userRepository = await getConnection().getRepository(User);
        let userRemove = await userRepository.findOne({ id: uid });
        let resUser = await userRepository.remove(userRemove);
        return { ...resUser };
    } catch (e) {
        throw e;
    }
}

async function getUserById(uid: number) {
    try {
        const userRepository = await getConnection().getRepository(User);
        return await userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("user.role", "role")
            .where("user.id = :id", { id: uid })
            .getOne();
    } catch (e) {
        throw e;
    }
}
async function getAllUser() {
    try {
        const userRepository = await getConnection().getRepository(User);
        return await userRepository.find({
            select: ["id", "username", "create_time"],
            relations: ["profile", "role"]
        })
    } catch (e) {
        throw e;
    }
}



export default {
    createUser,
    createUserProfile,
    updateUserProfile,
    updateRole,
    deleteUser,
    getUserById,
    getAllUser,
    updatePassword
};