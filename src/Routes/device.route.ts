import express, { Request, Response } from "express";
import deviceController from "../Controller/device.controller";




const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    try {
        var device = await deviceController.createDevice({
            id: null,
            name: req.body.name,
            description: req.body.description,
            ip: req.body.ip,
            locationId: req.body.locationID != null ? Number(req.body.locationID) : null,
            lpr_db_id: req.body.lpr_db_id != null ? Number(req.body.lpr_db_id) : null
        })
        return res.send(device);
    } catch (e) { return res.status(400).send(e) }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        var deviceList = await deviceController.getAllDevice();
        return res.send(deviceList);
    } catch (e) { res.status(400).send(e) }
});
router.get('/getDeviceByCameraName', async (req: Request, res: Response) => {
    try {
        let camera = String(req.query.camera);
        // console.log('Camera ', camera)
        var device = await deviceController.getDeviceByCameraName(camera);
        return res.send(device);
    } catch (e) { res.status(400).send(e) }
});
router.get('/:id', async (req: Request, res: Response) => {
    try {
        // console.log('Camera ')
        let id = Number(req.params.id);
        let device = await deviceController.getDeviceByID(id);
        return res.send(device);
    } catch (e) { return res.status(400).send(e) }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        var updatedevice = await deviceController.updateDevice({
            id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            ip: req.body.ip,
            locationId: req.body.locationID != null ? Number(req.body.locationID) : null,
            lpr_db_id: req.body.lpr_db_id != null ? Number(req.body.lpr_db_id) : null
        })
        return res.send(updatedevice);
    } catch (e) { return res.status(400).send(e) }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        var id = Number(req.params.id);
        var deletedevice = await deviceController.deleteDevice(id);
        return res.send(deletedevice);
    } catch (e) { return res.status(400).send(e) }
});

export default router;