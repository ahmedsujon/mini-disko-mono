import cors from "cors";
import express from "express";
import adminRouter from "./routes/admin.js";
import songsRouter from "./routes/songs.js";
import initializeAdmin from "./utils/initializeAdmin.js";
import recordingsRouter from "./routes/recordings.js";
import { uploadsDirectory } from "./utils/multerConfig.js";

const app: express.Application = express();

app.use(express.json());
app.use(cors());

app.use("/", adminRouter);
app.use("/songs", songsRouter);
app.use("/recordings", recordingsRouter);

app.use("/uploads", express.static(uploadsDirectory));

(() => {
    initializeAdmin();
})();

export default app;
