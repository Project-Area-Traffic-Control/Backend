import express, { Request, Response } from "express";
import alertHistoryController from "../Controller/alertHistory.controller";




const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        var historyList = await alertHistoryController.getALLAlertHistory();
        return res.send(historyList);
    } catch (e) { res.status(400).send(e) }
});
router.get('/getHistoryUnAccept', async (req: Request, res: Response) => {
    try {
        var historyList = await alertHistoryController.getAlertHistory_UnAccept();
        return res.send(historyList);
    } catch (e) { return res.status(400).send(e) }
});
router.put('/accept/:id', async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id)
        let uid = Number(req.body.uid)
        var response = await alertHistoryController.acceptLicenseAlert(id,uid);
        return res.send(response);
    } catch (e) { return res.status(400).send(e) }
});

export default router;