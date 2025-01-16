let ioInstance;

export const setIoInstance = (io) => {
  ioInstance = io;
};

export const getIoInstance = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO instance is not initialized!');
  }
  return ioInstance;
};
