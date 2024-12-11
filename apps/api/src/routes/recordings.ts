import express from "express";
import { db } from "../db/db.js";
import authenticateToken from "../utils/authenticateToken.js";
import { upload } from "../utils/multerConfig.js";

const router: express.Router = express.Router();

router.get("/", authenticateToken, async (_, res) => {
    const recordings = await db
        .selectFrom("recordings")
        .selectAll()
        .orderBy("id asc")
        .execute();
    res.json(recordings);
});

router.post("/", upload.single("video"), async (req, res) => {
    if (!req.file) {
        res.status(400).send({ message: "No file uploaded" });
        return;
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const recording = req.body;

    try {
        const newRecording = await db
            .insertInto("recordings")
            .values({
                ...recording,
                file_url: fileUrl,
            })
            .returningAll()
            .execute();

        await db
            .updateTable("songs")
            .set((eb) => ({
                play_count: eb("play_count", "+", 1),
            }))
            .where("id", "=", recording.song_id)
            .executeTakeFirst();

        if (newRecording) {
            res.send({ message: "Song added successfully" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const deletedRecording = await db
            .deleteFrom("recordings")
            .where("id", "=", req.params.id)
            .executeTakeFirst();
        if (Number(deletedRecording.numDeletedRows)) {
            res.json({ message: "Recording deleted successfully" });
            return;
        }
        res.status(404).json({ message: "Recording not found" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
