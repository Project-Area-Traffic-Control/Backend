import express, { Request, Response } from "express";
const router = express.Router();
import AreaRoute from './area.route';
import UserRoute from './user.route';
import AdminRoute from './admin.route';
import JunctionRoute from './junction.route';
import ChannelRoute from './channel.route';
import PhaseRoute from './phase.route';
import FlashingRoute from './flashing.route';
import FixtimeRoute from './fixtime.route';
import PlanRoute from './plan.route';
import PatternRoute from './pattern.route';
// import AuthRoute from './auth.route';
// import RoleRoute from './role.route'
// import LicenseRoute from './license.route'
// import LocationRoute from './location.route'
// import LPR_DB_Route from './lpr_db.route'
// import DeviceRoute from './device.route'
// import MlprRoute from './mlpr.route'
// import LocationRoutingRoute from './locationRouting.route'
// import AlertHistoryRoute from './alertHistory.route'


router.get("/Camera", (req: Request, res: Response) => {
    //res.send("App is Running")
    res.sendFile(__dirname + "/index.html");
});

router.use('/areas', AreaRoute);
router.use('/users', UserRoute);
router.use('/admin', AdminRoute);
router.use('/junctions', JunctionRoute);
router.use('/channels', ChannelRoute);
router.use('/phases', PhaseRoute);
router.use('/flash_mode', FlashingRoute);
router.use('/fixtime_mode', FixtimeRoute);
router.use('/plans', PlanRoute);
router.use('/patterns', PatternRoute);
// router.use('/auth', AuthRoute);
// router.use('/role', RoleRoute);
// router.use('/license', LicenseRoute);
// router.use('/location', LocationRoute);
// router.use('/lpr_db', LPR_DB_Route);
// router.use('/device', DeviceRoute);
// router.use('/mlpr', MlprRoute);
// router.use('/locationRouting', LocationRoutingRoute);
// router.use('/alertHistory', AlertHistoryRoute);


export default router;