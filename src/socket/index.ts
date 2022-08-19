import { logger } from "cyber-logger";
import { Socket } from "socket.io";

export default class Session {
  public static init(socket: Socket, num_players: (room : string) => number): void {
    const { session, player_id } = socket.request.headers;
    const room = session.toString();
    socket.join(room);

    logger.info(`Player ${player_id} connected! - total ${num_players(room)}`);
    
    if(num_players(room) > 2){
        logger.info(`Player ${player_id} refused`);
        socket.disconnect();
    }else{
        socket.to(room).emit("nome_legal", `player ${player_id} entrou`);

    }
    

    socket
      .on("nome_legal", (msg) => {
        logger.info(`Player ${player_id}: ${msg}`);
        socket.to(room).emit("nome_legal", msg);
      })
      .on("disconnect", () => {
        socket.leave(room);
        logger.info(`Player ${player_id} disconnected`);
      });
  }
}
