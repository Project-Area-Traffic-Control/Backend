import express, { Request, Response } from "express";
import phaseController from "../Controller/phase.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let phase = await phaseController.getAllPhase();
        //delete user.user["password"]
        return res.send(phase);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let phase = await phaseController.getPhaseById(id);
        return res.send(phase);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const phase = await phaseController.createPhase({
            type: req.body.type,
            port_number: req.body.port_number,
            channelID: req.body.channel_id
        })
        return res.send(phase)
    }
    catch (e) {
        return res.send(e).status(400);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        let newPhase = await phaseController.updatePhase({
            id: id,
            type: req.body.type,
            port_number: req.body.number_lane,
            channelID: req.body.channel_id
        })
        return res.send(newPhase);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let deleteChannel = await phaseController.deletePhase(uid);
        return res.send(deleteChannel);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default router;