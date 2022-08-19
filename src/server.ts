import { logger } from "cyber-logger";
import { Server } from "http";
import socket from "socket.io";

import app from "./app";
import Session from "./socket";
import { Socket } from "socket.io";

const port = process.env.PORT || 3001;

const http = new Server(app);

const io = new socket.Server(http);
const players_num = (room : string): number =>{
    return io.of(`/`).adapter.rooms.get(room).size
}
http.listen(port, () => logger.info(`Server running on port: ${port}`));
io.on("connection",  (socket: Socket) => {
    Session.init(socket, players_num);
});
