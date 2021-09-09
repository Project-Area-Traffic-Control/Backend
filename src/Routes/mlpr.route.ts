import express, { Request, response, Response } from "express";
import licenseController from "../Controller/license.controller";
import mlprController from "../Controller/mlpr.controller";

const router = express.Router();


router.get('/getCurrentDate', async (req: Request, res: Response) => {
    try {
        var now = new Date(Date.now())
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        const data = await mlprController.getDataBetweenDate(start, end);
        return res.send(data);
    } catch (e) { return res.status(400).send(e) }
});

router.get('/getCount', async (req: Request, res: Response) => {
    try {
        var now = new Date(Date.now())
        var startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        var startWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);

        const countCurrentDay = await mlprController.getCountBetweenDate(startDay, end);
        const countLast7Day = await mlprController.getCountBetweenDate(startWeek, end);

        var count = {
            currentDay: countCurrentDay,
            last7Day: countLast7Day
        }
        return res.send(count);

    } catch (e) { return res.status(400).send(e) }
})

router.get('/getCountLicenseAlertCurrentDate', async (req: Request, res: Response) => {
    try {
        var now = new Date(Date.now())
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        var licensesBlacklist = await licenseController.getLicenseBlacklist();
        var licensesWhitelist = await licenseController.getLicenseWhitelist();
        var countBlacklist = await mlprController.getCountLicenseAlertBetweenDate(start, end, licensesBlacklist);
        var countWhitelist = await mlprController.getCountLicenseAlertBetweenDate(start, end, licensesWhitelist);
        var count = {
            blacklist: countBlacklist,
            whitelist: countWhitelist
        }
        return res.send(count);

    } catch (e) { return res.status(400).send(e) }
})
router.get('/getLastData/:limit', async (req: Request, res: Response) => {
    try {
        var limit: number = Number(req.params.limit);
        var data = await mlprController.getLastData(limit);
        return res.send(data);
    } catch (e) { return res.status(400).send(e) }
});

router.post('/getDataBetweenDate', async (req: Request, res: Response) => {
    try {
        var start = new Date(req.body.start);
        var end = new Date(req.body.end);

        if (!(start.valueOf() && end.valueOf())) return res.sendStatus(400);

        var data = await mlprController.getDataBetweenDate(start, end);
        return res.send(data);
    } catch (e) { return res.status(400).send(e) }
});
router.post('/getDataByCameraName', async (req: Request, res: Response) => {
    try {
        var cameraName: string = String(req.body.camera);
        var limit: number = req.body.limit ? Number(req.body.limit) : null
        var data = await mlprController.getDataByCameraName(cameraName, limit);
        return res.send(data);
    } catch (e) { return res.status(400).send(e) }
});
router.post('/getDataWithFilter', async (req: Request, res: Response) => {
    try {
        var data = await mlprController.getDataWithFilter({
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            license: req.body.license ? req.body.license : null,
            province: req.body.province ? req.body.province : null,
            camera_name: req.body.camera_name ? req.body.camera_name : null,
            model: req.body.model ? req.body.model : null,
            color: req.body.color ? req.body.color : null,
            category: req.body.category ? req.body.category : null
        });
        console.log()
        return res.send(data);
    } catch (e) { return res.send(e).status(400) }
})
router.get('/getImageOverview/:id', async (req: Request, res: Response) => {
    try {
        let PID: string = req.params.id;
        let camera = req.query.camera;
        if (camera == '' || camera == undefined)
            return res.send({ message: "Camera is null or undefined" }).status(400);
        var data = await mlprController.getImageOverview(PID, String(camera));
        if (data == null)
            return res.send({ message: "Unknown PID : " + PID + " or Camera : " + camera }).status(400);
        return res.send(data);
    } catch (e) { return res.send(e).status(400) }
})
router.get('/getImageLicense/:id', async (req: Request, res: Response) => {
    try {
        let PID: string = req.params.id;
        let camera = req.query.camera;
        if (camera == '' || camera == undefined)
            return res.send({ message: "Camera is null or undefined" }).status(400);
        var data = await mlprController.getImageLicense(PID, String(camera));
        if (data == null)
            return res.send({ message: "Unknown PID : " + PID + " or Camera : " + camera }).status(400);
        return res.send(data);
    } catch (e) { return res.send(e).status(400) }
})
router.get('/getDetailData/:id', async (req: Request, res: Response) => {
    try {
        let PID: string = req.params.id;
        let camera = req.query.camera;
        if (camera == '' || camera == undefined)
            return res.send({ message: "Camera is null or undefined" }).status(400);
        var data = await mlprController.getDetailDataByID(PID, String(camera));
        if (data == null)
            return res.send({ message: "Unknown PID : " + PID + " or Camera : " + camera }).status(400);
        return res.send(data);
    } catch (e) { return res.send(e).status(400) }
})

export default router;