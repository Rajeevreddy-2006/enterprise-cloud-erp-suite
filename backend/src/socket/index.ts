import { Server } from "socket.io";
let io: Server;
export const initializeSocket = (httpServer: any) => {
  io = new Server(
    httpServer,{ cors: { origin: "*", }, }
  );
  io.on(
    "connection",
    (socket) => {
      console.log("User connected:",socket.id);
      socket.on("disconnect",() => {
        console.log("User disconnected:",socket.id);
      });
    }
  );
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};