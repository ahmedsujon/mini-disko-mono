import { db } from "../db/db.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router: express.Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await db
            .selectFrom("admin")
            .selectAll()
            .where("username", "=", username)
            .executeTakeFirst();

        if (!admin) {
            res.status(401).send({ message: "Invalid username or password!" });
            return;
        }

        const isPassValid = await bcrypt.compare(password, admin.password_hash);
        if (!isPassValid) {
            res.status(401).send({ message: "Invalid username or password!" });
            return;
        }
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );
        res.send({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
