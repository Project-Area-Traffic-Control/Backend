import { getConnection, getRepository } from "typeorm";
import { License } from "../Models/License.model";

interface licenseInterface {
    id: number
    license: string,
    province: string,
    isBlacklist: boolean,
    description: string
}

const createLicense = async ({ license, province, isBlacklist, description }: licenseInterface) => {
    try {
        var licenseData = new License();
        licenseData.license = license;
        licenseData.province = province;
        licenseData.isBlacklist = isBlacklist;
        licenseData.description = description;
        return await getConnection().getRepository(License).save(licenseData);
    } catch (e) { throw e }
}
const getAllLicense = async () => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        return await licenseRepository.find();
    } catch (e) { throw e }
}
const getLicenseByID = async (id: number) => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        return await licenseRepository.findOne({ id: id })
    } catch (e) { throw e }
}
const getLicenseByLicensePlate = async (license: string) => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        return await licenseRepository.findOne({
            license: license
        });
    } catch (e) { throw e }
}
const getLicenseActiveByLicensePlate = async (license: string) => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        return await licenseRepository.findOne({
            license: license,
            active: true
        });
    } catch (e) { throw e }
}

const getLicenseBlacklist = async () => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        return await licenseRepository.find({
            isBlacklist: true
        });
    } catch (e) { throw e }
}
const getLicenseWhitelist = async () => {
    try {
        const licenseRepository = await getConnection().getRepository(License);
        return await licenseRepository.find({
            isBlacklist: false
        });
    } catch (e) { throw e }
}
const updateLicense = async ({ id, license, province, isBlacklist, description }: licenseInterface) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(License)
            .set({ license: license, province: province, isBlacklist: isBlacklist, description: description })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const updateActiveStatus = async ({ id, state }) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .update(License)
            .set({ active: state })
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}
const deleteLicense = async (id: number) => {
    try {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(License)
            .where("id = :id", { id: id })
            .execute();
    } catch (e) { throw e }
}


export default {
    createLicense,
    getAllLicense,
    getLicenseByID,
    getLicenseByLicensePlate,
    updateLicense,
    deleteLicense,
    getLicenseBlacklist,
    getLicenseWhitelist,
    updateActiveStatus,
    getLicenseActiveByLicensePlate
}

