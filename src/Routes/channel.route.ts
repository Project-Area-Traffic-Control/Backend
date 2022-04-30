import express, { Request, Response } from "express";
import channelController from "../Controller/channel.controller";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let channel = await channelController.getAllChannel();
        //delete user.user["password"]
        return res.send(channel);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let channel = await channelController.getChannelById(id);
        return res.send(channel);
    } catch (e) {
        return res.status(400).send(e);
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const channel = await channelController.createChannel({
            name: req.body.name,
            number_lane: req.body.number_lane,
            order: req.body.order,
            junctionID: req.body.junction_id
        })
        return res.send(channel)
    }
    catch (e) {
        return res.send(e).status(400);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        let newChannel = await channelController.updateChannel({
            id: id,
            name: req.body.name,
            number_lane: req.body.number_lane,
            order: req.body.order,
            junctionID: req.body.junction_id
        })
        return res.send(newChannel);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let deleteChannel = await channelController.deleteChannel(uid);
        return res.send(deleteChannel);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/getByJunctionID/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let channel = await channelController.getChannelByJunctionID(id);
        return res.send(channel);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default router;