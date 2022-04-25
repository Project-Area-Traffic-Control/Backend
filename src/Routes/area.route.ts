import express, { Request, Response } from "express";
import areaController from "../Controller/area.controller";


const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        let area = await areaController.getAllArea();
        //delete user.user["password"]
        return res.send(area);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let area = await areaController.getAreaById(id);
        return res.send(area);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const area = await areaController.createArea({
            id: null,
            name: req.body.name
        });
        return res.send(area)

    } catch (e) { return res.status(400).send(e) }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        let newProfile = await areaController.updateArea({
            id: id,
            name: req.body.name
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
        let deleteArea = await areaController.deleteArea(uid);
        return res.send(deleteArea);
    } catch (e) {
        return res.status(400).send(e);
    }
})

export default router;