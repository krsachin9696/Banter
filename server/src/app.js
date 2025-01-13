import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';
import socketHandler from './sockets/socketHandler.js';
import logger from './utils/logger.js';

const app = express();
const server = createServer(app); // HTTP server for both Express and Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

// Logging requests
app.use(loggerMiddleware);

// Root route
app.get('/', (req, res) => {
  logger.info('GET / route accessed');
  res.json({ message: 'This is a route.' });
});

// Global error handler
app.use(errorHandler);

// Initialize Socket.IO handlers
socketHandler(io);

// Start the server
server.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
