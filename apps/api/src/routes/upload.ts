import { db } from "../db/db.js";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const router: express.Router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post("/upload", upload.single("video"), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send({ message: "No file uploaded" });
            return;
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        const filePath = path.join(uploadsDir, req.file.filename);

        console.log({
            fileUrl,
            uploadsDir,
            filePath,
        });

        res.status(200).send({ message: "Video uploaded successfully!" });
        return;

        // Insert file data into the recordings table
        // const admin = await db
        //     .selectFrom("admin")
        //     .selectAll()
        //     .where("username", "=", username)
        //     .executeTakeFirst();

        // res.status(200).json({
        //     message: "Video uploaded successfully!",
        //     fileUrl,
        // });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
