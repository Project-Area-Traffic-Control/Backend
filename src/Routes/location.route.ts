import express, { Request, Response } from "express";
import locationController from "../Controller/location.controller";



const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    try {
        var location = await locationController.createLocation({
            id: null,
            name: req.body.name,
            latitude: Number(req.body.latitude),
            longgitude: Number(req.body.longgitude)
        })
        return res.send(location);
    } catch (e) { return res.status(400).send(e) }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        var locationList = await locationController.getAllLocation();
        return res.send(locationList);
    } catch (e) { res.status(400).send(e) }
});
router.get('/:id', async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let location = await locationController.getLocationByID(id);
        return res.send(location);
    } catch (e) { return res.status(400).send(e) }
});
router.put('/:id', async (req: Request, res: Response) => {
    try {
        var updateLocation = await locationController.updateLocation({
            id: Number(req.params.id),
            name: req.body.name,
            latitude: Number(req.body.latitude),
            longgitude: Number(req.body.longgitude)
        })
        return res.send(updateLocation);
    } catch (e) { return res.status(400).send(e) }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        var id = Number(req.params.id);
        var deleteLocation = await locationController.deleteLocation(id);
        return res.send(deleteLocation);
    } catch (e) { return res.status(400).send(e) }
});

export default router;