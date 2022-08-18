import { logger } from "cyber-logger";
import { Server } from "http";
import socket, { Socket } from "socket.io";

import app from "./app";

const port = process.env.PORT || 3000;

const http = new Server(app);

const io = new socket.Server(http);

http.listen(port, () => logger.info(`Server running on port: ${port}`));

io.on("connection", (socket: Socket) => {
  const { session, player_id } = socket.request.headers;
  const room = session.toString();

  logger.info(`Player ${player_id} connected!`);

  socket.on(room, (msg) => {
    logger.info(`Player ${player_id}: ${msg}`);
    socket.broadcast.emit(room, msg);
  });
});
