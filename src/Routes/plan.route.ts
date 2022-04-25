import express, { Request, Response } from "express";
import planController from "../Controller/plan.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let plan = await planController.getAllPlan();
        //delete user.user["password"]
        return res.send(plan);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let plan = await planController.getPlanById(id);
        return res.send(plan);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const fixtime = await planController.createPlan({
            name: req.body.name,
            yellow_time: req.body.yellow_time,
            delay_red_time: req.body.delay_red_time,
            junctionID: req.body.junction_id
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
        let newPhase = await planController.updatePlan({
            id: id,
            name: req.body.name,
            yellow_time: req.body.yellow_time,
            delay_red_time: req.body.delay_red_time,
            junctionID: req.body.junction_id
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
        let deletePlan = await planController.deletePlan(uid);
        return res.send(deletePlan);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default router;