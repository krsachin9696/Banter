import logger from '../utils/logger.js';

const userSocketMap = {}; // Map userID to socket ID

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Register a user with their socket ID
    socket.on('register_user', ({ userID }) => {
      if (userID) {
        userSocketMap[userID] = socket.id;
        logger.info(`User ${userID} registered with socket ID: ${socket.id}`);
      }
    });

    // Handle one-to-one messaging
    socket.on('send_message', (newMessage) => {
      const { senderID, receiverID, message } = newMessage;

      logger.info(
        `Message from ${senderID} to ${receiverID}: ${message}`,
      );

      // Emit the message to the receiver
      const receiverSocketId = userSocketMap[receiverID];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_message', newMessage);
        logger.info(`Message sent to ${receiverID} via socket ${receiverSocketId}`);
      } else {
        logger.warn(`User ${receiverID} is not online.`);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const disconnectedUser = Object.keys(userSocketMap).find(
        (userID) => userSocketMap[userID] === socket.id,
      );

      if (disconnectedUser) {
        delete userSocketMap[disconnectedUser];
        logger.info(`User ${disconnectedUser} disconnected.`);
      }
    });
  });
};

export default socketHandler;
