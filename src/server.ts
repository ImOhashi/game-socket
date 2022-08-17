import { logger } from "cyber-logger";

import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server running on port: ${port}`));
