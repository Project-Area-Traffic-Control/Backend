import express, { Request, Response } from "express";
import deviceController from "../Controller/device.controller";
import mlprController from "../Controller/mlpr.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        console.log('Requese ')
        console.log(req.body)
        var start: Date = new Date(req.body.start);
        var end: Date = new Date(req.body.end);
        var license: string = req.body.license;
        var province: string = req.body.province;
        console.log(start)
        
        if (!(start.valueOf() && end.valueOf())) return res.sendStatus(400);

        var dataList = await mlprController.getDataByLicenseBetweenDate(license, province, start, end);
        var i = 0;
        for (let data of dataList) {
            dataList[i].device = await deviceController.getDeviceByCameraName(data.CAMERA);
            i += 1;
        }
        return res.send(dataList);

    } catch (e) { return res.send(e).status(400) }
});

export default router;