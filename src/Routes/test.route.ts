import express, { Request, Response, Router } from "express";
import testController from "../Controller/test.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        var data = await testController.testConnection();
        return res.send(data)
    } catch (e) {
        return res.send(e).status(400);
    }
});
router.get("/connect", async (req: Request, res: Response) => {
    try{
        await testController.getConnectionDB();
        return res.sendStatus(200)
    }catch(e){
        return res.status(400).send(e)
    }
})
export default router;