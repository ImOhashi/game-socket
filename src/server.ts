import { logger } from "cyber-logger";
import { Server } from "http";
import socket from "socket.io";

import app from "./app";
import Session from "./socket";

const port = process.env.PORT || 3000;

const http = new Server(app);

const io = new socket.Server(http);

http.listen(port, () => logger.info(`Server running on port: ${port}`));

io.on("connection", Session.init);
