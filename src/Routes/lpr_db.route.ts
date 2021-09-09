import express, { Request, Response } from "express";
import locationController from "../Controller/location.controller";
import LPR_DB_Controller from "../Controller/LPR_DB.controller";



const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    try {
        var lpr_db = await LPR_DB_Controller.create_LPR_DB({
            id: null,
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            type: req.body.type,
            host: req.body.host,
            port: Number(req.body.port),
            database: req.body.database
        })
        return res.send(lpr_db);

    } catch (e) { return res.status(400).send(e) }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        var lpr_db_list = await LPR_DB_Controller.getAll_LPR_DB();
        return res.send(lpr_db_list);
    } catch (e) { res.status(400).send(e) }
});
router.get('/:id', async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let lpr_db = await LPR_DB_Controller.get_LPR_DB_ByID(id);
        return res.send(lpr_db);
    } catch (e) { return res.status(400).send(e) }
});
router.put('/:id', async (req: Request, res: Response) => {
    try {
        var update_LPR_DB = await LPR_DB_Controller.update_LPR_DB({
            id: Number(req.params.id),
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            type: req.body.type,
            host: req.body.host,
            port: Number(req.body.port),
            database: req.body.database
        })
        return res.send(update_LPR_DB);
    } catch (e) { return res.status(400).send(e) }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        var id = Number(req.params.id);
        var delete_LPR_DB = await LPR_DB_Controller.delete_LPR_DB(id);
        return res.send(delete_LPR_DB);
    } catch (e) { return res.status(400).send(e) }
});

export default router;