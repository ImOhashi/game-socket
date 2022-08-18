import { logger } from "cyber-logger";
import { Socket } from "socket.io";

export default class Session {
  public static init(socket: Socket): void {
    const { session, player_id } = socket.request.headers;
    const room = session.toString();

    logger.info(`Player ${player_id} connected!`);

    socket
      .on(room, (msg) => {
        logger.info(`Player ${player_id}: ${msg}`);
        socket.broadcast.emit(room, msg);
      })
      .on("disconnect", () => {
        logger.info(`Player ${player_id} disconnected`);
      });
  }
}
