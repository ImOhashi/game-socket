import { Server } from "http";
import { logger } from "cyber-logger";

import app from "./app";

const port = process.env.PORT || 3000;

const http = new Server(app);

http.listen(port, () => logger.info(`Server running on port: ${port}`));
