import express, { Request, Response } from "express";
import { print } from "util";
import junctionController from "../Controller/junction.controller";
import junctionControlController from "../Controller/junction.control.controller";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let junction = await junctionController.getAllJunction();
        //delete user.user["password"]
        return res.send(junction);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let junction = await junctionController.getJunctionById(uid);

        return res.send(junction);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const juntion = await junctionController.createJunction({
            id: null,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            number_channel: req.body.number_channel,
            areaId: req.body.area_id,
            rotate: req.body.rotate
        })
        return res.send(juntion)
    }
    catch (e) {
        return res.send(e).status(400);
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const uid = Number(req.params.id);
    try {
        let newProfile = await junctionController.updateJunction({
            id: uid,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            number_channel: req.body.number_channel,
            areaId: req.body.area_id,
            rotate: req.body.rotate
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
        let deleteJunction = await junctionController.deleteJunction(uid);
        return res.send(deleteJunction);
    } catch (e) {
        return res.status(400).send(e);
    }
})
router.put('/:id/setMode', async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let mode = Number(req.body.mode);
        console.log("Junction ", id, " set mode : ", mode);
        junctionControlController.setMode(id, mode);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(400).send(e);
    }
})
router.put('/:id/setPhase', async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let phase = Number(req.body.phase);
        console.log("Junction ", id, " set phase : ", phase);
        junctionControlController.setPhase(id, phase);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(400).send(e);
    }
})

export default router;