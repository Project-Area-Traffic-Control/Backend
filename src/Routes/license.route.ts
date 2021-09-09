import express, { Request, Response } from "express";
import licenseController from "../Controller/license.controller";



const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    try {
        var license = await licenseController.createLicense({
            id: null,
            license: req.body.license,
            province: req.body.province,
            isBlacklist: Boolean(req.body.isBlacklist),
            description: req.body.description
        })
        return res.send(license);
    } catch (e) { return res.status(400).send(e) }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        var licenseList = await licenseController.getAllLicense();
        return res.send(licenseList);
    } catch (e) { res.status(400).send(e) }
});
router.get('/:id', async (req: Request, res: Response) => {
    try {
        var id = Number(req.params.id);
        var license = await licenseController.getLicenseByID(id);
        return res.send(license);
    } catch (e) { return res.status(400).send(e) }
});
router.put('/:id', async (req: Request, res: Response) => {
    try {
        var updateLicense = await licenseController.updateLicense({
            id: Number(req.params.id),
            license: req.body.license,
            province: req.body.province,
            isBlacklist: req.body.isBlacklist,
            description: req.body.description
        })
        return res.send(updateLicense);
    } catch (e) { return res.status(400).send(e) }
});
router.put('/updateActiveStatus/:id', async (req: Request, res: Response) => {
    try {
        var updateLicense = await licenseController.updateActiveStatus({
            id: Number(req.params.id),
            state: Boolean(req.body.state)
        })
        return res.send(updateLicense);
    } catch (e) { return res.status(400).send(e) }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        var id = Number(req.params.id);
        var deleteLicense = await licenseController.deleteLicense(id);
        return res.send(deleteLicense);
    } catch (e) { return res.status(400).send(e) }
});

export default router;