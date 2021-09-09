import express, { Request, Response, RequestHandler, response } from "express";
import crypto from 'crypto';

import authController from "../Controller/auth.controller";
import passport from "passport";

const router = express.Router();

const jwtAuth: RequestHandler = passport.authenticate("jwt", {
    session: false
});

router.get("/", (req: Request, res: Response) => {
    res.send("Auth Route")
});

router.post('/login', async (req: Request, res: Response) => {
    try {
      
        const password = await crypto.createHash('md5').update(req.body.password).digest("hex");

        const user = await authController.signIn({
            username: req.body.username ,
            password: password
        })

        if (user.access_token) {
            return res.status(200).cookie("access_token", user).send({ user })
        }
        else {
            return res.status(400).send(JSON.stringify(user.massage))
        }
    }
    catch (e) {

        return res.status(401).send(e);
    }
})

router.get('/verify', jwtAuth, async (req, res) => {
    try {
        return res.send({ massage: "token is verify success" })
    }
    catch (e) {
        return res.send(e);
    }
})

export default router;