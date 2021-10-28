import express, { Request, Response } from "express";
import flashingController from "../Controller/flashing.controller";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let flashing = await flashingController.getAllFlashing();
        //delete user.user["password"]
        return res.send(flashing);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let phase = await flashingController.getFlashingById(id);
        return res.send(phase);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const flashing = await flashingController.createFlashing({
            type: req.body.type,
            junctionID: req.body.junction_id,
            channelID: req.body.channel_id,
            phaseID: req.body.phase_id
        })
        return res.send(flashing)
    }
    catch (e) {
        return res.send(e).status(400);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        let newPhase = await flashingController.updateFlashing({
            id: id,
            type: req.body.type,
            junctionID: req.body.junction_id,
            channelID: req.body.channel_id,
            phaseID: req.body.phase_id
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
        let deleteChannel = await flashingController.deleteFlashing(uid);
        return res.send(deleteChannel);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default router;