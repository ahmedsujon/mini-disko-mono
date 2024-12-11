import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: "Forbidden" });
        (req as any).user = user;
        next();
    });
};

export default authenticateToken;
