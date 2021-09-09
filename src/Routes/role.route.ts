import express, { Request, Response } from "express";
import roleController from "../Controller/role.controller";
import { Permission } from "../Models/Permission.model";


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const roles = await roleController.getAllRole();
        return res.send(roles);
    } catch (e) { res.status(400).send(e) }
});
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const role = await roleController.getRoleByID(Number(req.params.id));
        return res.send(role);
    } catch (e) { return res.status(400).send(e) }
});
router.post('/', async (req: Request, res: Response) => {
    try {
        var req_Permissions = req.body.permissions ? req.body.permissions : [];
        var permissions: Permission[] = [];
        for (let req_permission of req_Permissions) {
            let permission = new Permission();
            permission.name = req_permission.name;
            permission.view = req_permission.view ? req_permission.view : false;
            permission.edit = req_permission.edit ? req_permission.edit : false;
            permission.delete = req_permission.delete ? req_permission.delete : false;
            permission.export = req_permission.export ? req_permission.export : false;
            permissions.push(permission)
        }
        const role = await roleController.createRole({
            id: null,
            name: req.body.name,
            description: req.body.description,
            permissions: permissions
        });

        return res.send(role)

    } catch (e) { return res.status(400).send(e) }
});
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const role = await roleController.updateRole({
            id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            permissions: []
        });
        return res.send(role);
    } catch (e) { return res.status(400).send(e) }
});
router.put('/:id/updatePermission', async (req: Request, res: Response) => {
    try {
        var req_Permissions = req.body.permissions ? req.body.permissions : [];
        var permissions: Permission[] = [];
        for (let req_permission of req_Permissions) {
            let permission = new Permission();
            permission.id = Number(req_permission.id)
            permission.name = req_permission.name;
            permission.view = req_permission.view ? req_permission.view : false;
            permission.edit = req_permission.edit ? req_permission.edit : false;
            permission.delete = req_permission.delete ? req_permission.delete : false;
            permission.export = req_permission.export ? req_permission.export : false;
            permissions.push(permission)
        }
        const role = await roleController.updatePermissionInRole({
            id: Number(req.params.id),
            name: null,
            description: null,
            permissions: permissions
        });
        return res.send(role);
    } catch (e) { res.status(400).send(e) }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        
        var deleteRole = await roleController.deleteRole(Number(req.params.id));
        return res.send(deleteRole)
    } catch (e) { return res.status(400).send(e) }
});

export default router;