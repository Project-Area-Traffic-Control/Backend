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
            roleID: req.body.roleID != null ? Number(req.body.roleID) : null
        })
        delete user["password"];

        if (req.body.email || req.body.firstname || req.body.lastname) {
            const profile = await userController.createUserProfile({
                uid: user.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
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
            email: req.body.email
        })
        let roleID = req.body.roleID

        if (roleID == null) return res.send(newProfile)

        let newUser = await userController.updateRole(uid, Number(roleID));
        return res.send(newUser);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

router.put("/:id/updateRole", async (req: Request, res: Response) => {
    const uid = Number(req.params.id);
    try {

        let newUser = await userController.updateRole(uid, Number(req.body.role));
        return res.send(newUser);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});
router.put("/:id/updatePassword", async (req: Request, res: Response) => {
    try {
        let newPass = req.body.newPass;
        let currentPass = req.body.currentPass;
        let uid = Number(req.params.id)

        const currentPassMD5 = await crypto.createHash('md5').update(currentPass).digest("hex");
        let user = await userController.getUserById(uid);
        if (user.password !== currentPassMD5) return res.sendStatus(400);

        const newPassMD5 = await crypto.createHash('md5').update(newPass).digest("hex");

        let newUser = await userController.updatePassword(uid, newPassMD5)
        return res.send(newUser);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});
router.put("/:id/changePassword", async (req: Request, res: Response) => {
    try {
        let newPass = req.body.newPass;
        let uid = Number(req.params.id)

        const newPassMD5 = await crypto.createHash('md5').update(newPass).digest("hex");

        let newUser = await userController.updatePassword(uid, newPassMD5)
        return res.send(newUser);
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