import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import { getConnection } from "typeorm";
import { User } from "../Models/User.model";

export interface auth  {
    username: string;
    password: string;
}



const cookieOptions = {
    httpOnly: true,
    expires: new Date(
        Date.now() + Number.parseInt(config.get("cookies.expires"))
    ),
    signed: true
};

const jwtOptions: SignOptions = { expiresIn: config.get("jwt.expiresIn") };


async function signIn({
    username,
    password,
}
:auth
) {
   return getConnection().getRepository(User).findOne({ username:username }).then((
        result => {
            if (password === result.password) {

                const access_token = jwt.sign({ id: result.id },
                    config.get("jwt.secret"),
                    jwtOptions
                )
                return {
                    access_token,
                    Options: cookieOptions
                }
            }
            else {

                return { massage: "Incorrect username or password." }
            }

        }))
        .catch((e: Error) => {
            throw e;
        })
}




export default {
    signIn,
};