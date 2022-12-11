import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { unlink } from "fs/promises";

const JWT_SECRET = "ProjectVBA123";

export const authenToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    //Bear [token]
    const token = authorizationHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: false });

    JWT.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            // if (req.file) {
            //     await unlink(req.file.path);
            // }
            return res.status(400).json({ message: "Failed to verify token" });
        } else {
            req.body.token = decoded;
            console.log("verifyToken.js --> line: 18 --> decode: ", decoded);
            next();
        }
    });
};
