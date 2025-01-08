import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import { randomInt } from "crypto";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store for users
// const users: { id: string; name: string }[] = []; // type annotation is not required over here
const users = [];
const messages = []; // Example: { senderId: string, receiverId: string, message: string, timestamp: string }

app.get("/", (req, res) => {
  console.log("server is up and running");
  return res.status(200).json({ message: "server is up and running" })
})

// API to register a user
app.post("/register", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    return res.status(400).json({ error: "User already registered" });
  }

  // Add user to the in-memory data store
  const user = { id: `${Date.now()}`, name };
  users.push(user);

  return res.status(201).json({ message: "User registered successfully", user });
});

app.get("/users", (req, res) => {
  const userID = req.headers.userid;
  const enrichedUsers = users
    .filter((user) => user.id !== userID)
    .map((user) => {
      // Get the latest message for the user (example logic)
      const userMessages = messages
        .filter((msg) => msg.receiverId === user.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const latestMessage = userMessages[0]?.message || "No messages yet";
      const time = userMessages[0]?.timestamp || "N/A";

      return { userID: user.id, name: user.name, latestMessage, time };
    });

  return res.status(200).json(enrichedUsers);
});

// API to send a message
app.post("/messages", (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: "Sender, receiver, and message are required" });
  }

  const newMessage = {
    id: randomInt(),
    senderId,
    receiverId,
    message,
    timestamp: new Date().toISOString(),
  };

  // Save the message in the in-memory data store
  messages.push(newMessage);

  // Emit the message to the receiver in real-time
  io.to(receiverId).emit("receive_message", newMessage);

  return res.status(201).json({ message: "Message sent successfully", newMessage });
});

const userSocketMap = {}; // { userID: socket.id }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Event to register userID with socket.id
  socket.on("register_user", (user) => {
    const userID = user.userID;
    userSocketMap[userID] = socket.id;
    // console.log(userSocketMap, "userSocketMap");
  });

  // Handle one-to-one messaging
  socket.on("send_message", (newMessage) => {

    const receiverID = newMessage.receiverID;
    const receiverSocketId = userSocketMap[receiverID];

    if (receiverSocketId) {
      // Emit message to the receiver
      io.to(receiverSocketId).emit("receive_message", newMessage);
    } else {
      console.log(`User ${receiverID} is not online.`);
    }
  });

  socket.on("disconnect", () => {
    // Remove disconnected socket from the map
    for (const [userID, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userID];
        console.log(`User ${userID} disconnected.`);
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
