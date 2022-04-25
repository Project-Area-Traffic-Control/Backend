import express, { Request, Response } from "express";
import adminController from "../Controller/admin.controller";
import crypto from 'crypto';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let admin = await adminController.getAllAdmin();
        //delete user.user["password"]
        return res.send(admin);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let admin = await adminController.getAdminById(id);
        return res.send(admin);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const password = await crypto.createHash('md5').update(req.body.password).digest("hex");
        const admin = await adminController.createAdmin({
            email: req.body.email,
            password: password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            tel: req.body.tel,
            image: req.body.pic,
            areaId: req.body.area_id
        });
        return res.send(admin)

    } catch (e) { return res.status(400).send(e) }
});

router.put("/:id", async (req: Request, res: Response) => {
    const uid = Number(req.params.id);
    try {
        let newProfile = await adminController.updateAdminProfile({
            uid: uid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            areaId: req.body.area_id,
            address: req.body.address,
            tel: req.body.tel,
            image: req.body.pic
        })
        // let roleID = req.body.roleID

        // if (roleID == null) return res.send(newProfile)

        // let newUser = await userController.updateRole(uid, Number(roleID));
        return res.send(newProfile);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let deleteAdmin = await adminController.deleteAdmin(uid);
        return res.send(deleteAdmin);
    } catch (e) {
        return res.status(400).send(e);
    }
})

export default router;