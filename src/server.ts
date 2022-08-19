import { logger } from "cyber-logger";
import { Server } from "http";
import socket from "socket.io";

import app from "./app";
import Session from "./socket";

const port = process.env.PORT || 3000;

const http = new Server(app);

const io: socket.Server = new socket.Server(http);

io.use((socket, next) => {
  const { session, player_id } = socket.request.headers;
  const room = session.toString();

  const players = io.of(`/`).adapter.rooms.get(room);

  if (players && players.size > 1) {
    logger.info(`Player ${player_id} refused`);

    next(new Error("Refused"));

    return;
  }

  logger.info(`Player ${player_id} connected`);

  socket.join(room);
  next();
});

http.listen(port, () => logger.info(`Server running on port: ${port}`));
io.on("connection", Session.init);
