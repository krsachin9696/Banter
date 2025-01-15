let io;
const userSocketMap = {};

export const setSocketServer = (socketServer) => {
  io = socketServer;
};

export const getSocketServer = () => io;

export const getUserSocketMap = () => userSocketMap;
