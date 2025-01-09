type MessageType = "text" | "image" | "video";
type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: string;
  type: MessageType;
  text?: string;
  mediaUri?: string;
  senderID: string;
  receiverID: string;
  timestamp: string;
  status?: MessageStatus;
}
