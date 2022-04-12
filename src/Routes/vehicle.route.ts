import express, { Request, Response } from "express";
import vehicleController from "../Controller/vehicle.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleController.createVehicle({
            // patternName: req.body.pattern,
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

export default router