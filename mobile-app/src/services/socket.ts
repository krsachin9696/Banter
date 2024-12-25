import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../apis";

const SOCKET_URL = `${SERVER_URL}`;

let socket: Socket;

// export const connectSocket = (userID: string) => {
  export const connectSocket = (userID: string) => {
  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    query: { userID },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not connected. Call connectSocket() first.");
  }
  return socket;
};
