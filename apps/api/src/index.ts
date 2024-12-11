import app from "./app.js";
import { ENV } from "./utils/env.js";
import { logger } from "./utils/logger.js";

app.listen(ENV.PORT, () => {
    logger.info(`Server running at http://localhost:${ENV.PORT}`);
});
