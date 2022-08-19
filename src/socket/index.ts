import { logger } from "cyber-logger";
import { Socket } from "socket.io";

export default class Session {
  public static init(socket: Socket): void {
    const { session, player_id } = socket.request.headers;
    const room = session.toString();
    socket
      .on("main", (msg) => {
        logger.info(`Player ${player_id}: ${msg}`);
        socket.to(room).emit("main", msg);
      })
      .on("disconnect", () => {
        socket.leave(room);
        logger.info(`Player ${player_id} disconnected`);
      });
  }
}
