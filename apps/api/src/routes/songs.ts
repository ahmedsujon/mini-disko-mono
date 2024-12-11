import express from "express";
import { db } from "../db/db.js";
import authenticateToken from "../utils/authenticateToken.js";

const router: express.Router = express.Router();

router.get("/", async (_, res) => {
    const songs = await db
        .selectFrom("songs")
        .selectAll()
        .orderBy("title asc")
        .execute();
    res.json(songs);
});

router.post("/", authenticateToken, async (req, res) => {
    const song = req.body;
    try {
        const newSong = await db
            .insertInto("songs")
            .values(song)
            .returningAll()
            .execute();
        if (newSong) {
            res.send({ message: "Song added successfully" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/:id", authenticateToken, async (req, res) => {
    const song = req.body;
    try {
        const updatedSong = await db
            .updateTable("songs")
            .set(song)
            .where("id", "=", req.params.id)
            .executeTakeFirst();
        if (Number(updatedSong.numUpdatedRows)) {
            res.json({ messsage: "Song updated successfully" });
            return;
        }
        res.status(404).json({ message: "Song not found" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const deletedSong = await db
            .deleteFrom("songs")
            .where("id", "=", req.params.id)
            .executeTakeFirst();
        if (Number(deletedSong.numDeletedRows)) {
            res.json({ message: "Song deleted successfully" });
            return;
        }
        res.status(404).json({ message: "Song not found" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
