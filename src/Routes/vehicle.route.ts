import express, { Request, Response } from "express";
import vehicleController from "../Controller/vehicle.controller";
import { Vehicle } from "../Models/Vehicle.model";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleController.createVehicle({
            // patternName: req.body.pattern,
            create_time: req.body.create_time,
            junctionID: req.body.junction_id,
            channelID: req.body.channel_id,
            phaseID: req.body.phase_id
        })
        return res.send(vehicle)
    }
    catch (e) {
        return res.send(e).status(400);
    }
});

router.get("/:id/junction", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let vehicle = await vehicleController.getAllVehicleByJunctionId(id);
        return res.send(vehicle);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/:id/channel", async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let vehicle = await vehicleController.getAllVehicleByChannelId(id);
        return res.send(vehicle);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/getSearch', async (req: Request, res: Response) => {
    try {
        // console.log("Junction ", id, " set phase : ", phase);
        // console.log("test")
        let vehicles = await vehicleController.getTotalDateSearch({
            start: req.body.start,
            end: req.body.end,
            junction_id: req.body.junction_id
        });
        // console.log(vehicles)
        return res.send(vehicles);
    } catch (e) {
        return res.status(400).send(e);
    }
})

export default router