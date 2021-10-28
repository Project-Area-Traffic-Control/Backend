import express, { Request, Response } from "express";
import userController from "../Controller/user.controller";
import crypto from 'crypto';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let user = await userController.getAllUser();
        //delete user.user["password"]
        return res.send(user);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let user = await userController.getUserById(uid);
        delete user["password"]

        return res.send(user);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const password = await crypto.createHash('md5').update(req.body.password).digest("hex");

        const user = await userController.createUser({
            username: req.body.username,
            password: password,
            areaId: req.body.area_id
        })
        delete user["password"];

        if (req.body.email || req.body.firstname || req.body.lastname || req.body.address || req.body.tel || req.body.image) {
            const profile = await userController.createUserProfile({
                uid: user.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                address: req.body.address,
                tel: req.body.tel,
                image: req.body.pic
            })
            user.profile = profile
        }
        return res.send(user)
    }
    catch (e) {
        return res.send(e).status(400);
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const uid = Number(req.params.id);
    try {
        let newProfile = await userController.updateUserProfile({
            uid: uid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
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

router.put("/:id/updateArea", async (req: Request, res: Response) => {
    const uid = Number(req.params.id);
    const areaID = Number(req.body.area);
    try {
        let newArea = await userController.updateArea(uid, areaID)
        // let roleID = req.body.roleID

        // if (roleID == null) return res.send(newProfile)

        // let newUser = await userController.updateRole(uid, Number(roleID));
        return res.send(newArea);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let deleteuser = await userController.deleteUser(uid);
        delete deleteuser["password"]
        return res.send(deleteuser);
    } catch (e) {
        return res.status(400).send(e);
    }
})

export default router;