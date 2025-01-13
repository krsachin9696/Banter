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
const userSocketMap = {}; // { userID: socket.id }

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
  const userID = req.headers.userid; // The user ID making the request
  if (!userID) {
    return res.status(400).json({ error: "UserID header is required" });
  }

  const enrichedUsers = users
    .filter((user) => user.id !== userID) // Filter out the current user
    .map((user) => {
      // Get all messages involving the current user and the other user (sender or receiver)
      const userMessages = messages
        .filter(
          (msg) =>
            (msg.receiverID === user.id && msg.senderID === userID) ||
            (msg.senderID === user.id && msg.receiverID === userID)
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp (most recent first)

      // Get the latest message, time, and status
      const latestMessage = userMessages.length > 0 ? userMessages[0].text : "No messages yet";
      const time = userMessages.length > 0 ? userMessages[0].timestamp : "N/A";
      const status = userMessages.length > 0 ? userMessages[0].status : "N/A";

      // Calculate unread messages by counting those with status "sent" or "delivered" for the current user
      const unreadMessages = userMessages.filter(
        (msg) =>
          msg.receiverID === userID && (msg.status === "sent" || msg.status === "delivered")
      ).length;

      return {
        userID: user.id,
        name: user.name,
        latestMessage,
        time,
        status,
        unreadMessages, // Adding unread message count
      };
    });

  return res.status(200).json(enrichedUsers);
});


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

app.get("/messages/conversation", (req, res) => {
  const { userId, otherUserId } = req.query;

  if (!userId || !otherUserId) {
    return res.status(400).json({ error: "Both userId and otherUserId are required" });
  }

  // Filter messages that are exchanged between the two users
  const conversation = messages.filter(
    (msg) =>
      (msg.senderID === userId && msg.receiverID === otherUserId) ||
      (msg.senderID === otherUserId && msg.receiverID === userId)
  );

  // Sort messages by timestamp (oldest first)
  conversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return res.status(200).json({ messages: conversation });
});


app.get("/getUsers", (req, res) => {
  res.status(200).json({ users, userSocketMap, messages });
})

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
    // Store the message in the in-memory data store
    messages.push(newMessage);

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
