import passport from "passport";
import {
    Strategy as JWTStrategy,
    StrategyOptions
} from "passport-jwt";
import { Application } from "express";
import config from "config";
import pick from "lodash/pick";
import { getConnection } from "typeorm";
import { User } from "../Models/User.model";


export default (app: Application) => {
    app.use(passport.initialize());
    const options: StrategyOptions = {
        jwtFromRequest(req) {
            let token = null;
            if (req && req.signedCookies) {
                token = req.cookies["access_token"].access_token;
            }
            return token;
        },
        secretOrKey: config.get("jwt.secret")
    };

    passport.use(
        new JWTStrategy(options, (payload, done) => {
            // return await getConnection().getRepository(User).save(user)
            console.log(payload)
            getConnection().getRepository(User).findOne({ id: payload.id }).then((user) => {
                if (!user) return done(null, false, { message: 'User not found' });
                else {
                    return done(null, pick(user, [
                        "id",
                        "username",
                        "created",
                    ]));
                }
            }).catch((err) => {
                return done(err, false);
            })

        })
    );
};
