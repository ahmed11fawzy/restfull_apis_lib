import jwt, { Secret, SignOptions } from "jsonwebtoken";

import IUser from "../Interfaces/iUser";
export const generateToken = (user:any): string => {
    const payload = { id: user._id, role: user?.role, status: user?.status };
    const secret = (process.env.JWT_SECRET ) as Secret;
    const options: SignOptions = { 
        expiresIn: Number(process.env.JWT_EXPIRATION) || '1h'
    };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): any => {
    try {   
        const secret = (process.env.JWT_SECRET ) as Secret;
        return jwt.verify(token, secret);
    }
    catch (error) {
        return null;
    }
}