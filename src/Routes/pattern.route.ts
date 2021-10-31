import express, { Request, Response } from "express";
import patternController from "../Controller/pattern.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let pattern = await patternController.getAllPattern();
        //delete user.user["password"]
        return res.send(pattern);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let pattern = await patternController.getPatternById(id);
        return res.send(pattern);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const fixtime = await patternController.createPattern({
            patternName: req.body.pattern,
            order: req.body.order,
            duration: req.body.duration,
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
        let newPattern = await patternController.updatePattern({
            id: id,
            patternName: req.body.pattern,
            order: req.body.order,
            duration: req.body.duration,
            planID: req.body.plan_id
        })
        return res.send(newPattern);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let uid = Number(req.params.id);
        let deletePattern = await patternController.deletePattern(uid);
        return res.send(deletePattern);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default router;