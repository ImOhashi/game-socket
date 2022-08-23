import { logger } from "cyber-logger";
import { Socket } from "socket.io";

export default class Session {
  public static init(socket: Socket): void {
    const { session, event } = socket.request.headers;

    const room = session.toString();
    const sessionEvent = event.toString();

    socket
      .on(sessionEvent, (msg) => {
        logger.info(
          `Player message: \n${
            typeof msg === "object" ? JSON.stringify(msg) : msg
          }`
        );
        socket.to(room).emit(sessionEvent, msg);
      })
      .on("disconnect", () => {
        socket.leave(room);
        logger.info(`Player disconnected`);
      });
  }
}
