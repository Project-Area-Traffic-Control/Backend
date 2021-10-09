import express, { Request, Response } from "express";
const router = express.Router();

// import AuthRoute from './auth.route';
// import UserRoute from './user.route'
// import RoleRoute from './role.route'
// import LicenseRoute from './license.route'
// import LocationRoute from './location.route'
// import LPR_DB_Route from './lpr_db.route'
// import DeviceRoute from './device.route'
// import MlprRoute from './mlpr.route'
// import LocationRoutingRoute from './locationRouting.route'
// import AlertHistoryRoute from './alertHistory.route'


router.get("/", (req: Request, res: Response) => {
    //res.send("App is Running")
    res.sendFile(__dirname + "/index.html");
});

// router.use('/auth', AuthRoute);
// router.use('/users', UserRoute);
// router.use('/role', RoleRoute);
// router.use('/license', LicenseRoute);
// router.use('/location', LocationRoute);
// router.use('/lpr_db', LPR_DB_Route);
// router.use('/device', DeviceRoute);
// router.use('/mlpr', MlprRoute);
// router.use('/locationRouting', LocationRoutingRoute);
// router.use('/alertHistory', AlertHistoryRoute);


export default router;