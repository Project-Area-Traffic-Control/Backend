import express, { Request, Response } from "express";
import fixtimeController from "../Controller/fixtime.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let fixtime = await fixtimeController.getAllFixtime();
        //delete user.user["password"]
        return res.send(fixtime);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let fixtime = await fixtimeController.getFixtimeById(id);
        return res.send(fixtime);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const fixtime = await fixtimeController.createFixtime({
            start: req.body.start,
            end: req.body.end,
            junctionID: req.body.junction_id,
            planID: req.body.plan_id
        })
        return res.send(fixtime)
    }
    catch (e) {
        return res.send(e).status(400);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        let newPhase = await fixtimeController.updateFixtime({
            id: id,
            start: req.body.start,
            end: req.body.end,
            junctionID: req.body.junction_id,
            planID: req.body.plan_id
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
        let deleteFixtime = await fixtimeController.deleteFixtime(uid);
        return res.send(deleteFixtime);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/byJunctionID/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let fixtime = await fixtimeController.getFixtimeByJunctionID(id);
        return res.send(fixtime);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default router;