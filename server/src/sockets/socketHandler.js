import logger from '../utils/logger.js';

const userSocketMap = {}; // Map userID to socket ID

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Register a user with their socket ID
    socket.on('register_user', (user) => {
      const userID = user.userID;
      userSocketMap[userID] = socket.id;
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

    socket.on('send_message', async (newMessage) => {
      const { senderID, convoID, message, receiverIDs } = newMessage; // receiverIDs: Array of userIDs

      // Store the message in the database (your existing Message model)
      await storeMessage(convoID, senderID, receiverIDs, message); // Assuming storeMessage is a function that stores the message

      // Emit the message to each recipient
      receiverIDs.forEach((receiverID) => {
        const receiverSocketId = userSocketMap[receiverID]?.socketId;
        if (receiverSocketId) {
          // If the recipient is online, send the message
          io.to(receiverSocketId).emit('receive_message', newMessage);
          logger.info(`Message sent to ${receiverID}`);
        } else {
          logger.warn(`User ${receiverID} is offline. Message not delivered instantly.`);
        }
      });
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

export {socketHandler, userSocketMap};
