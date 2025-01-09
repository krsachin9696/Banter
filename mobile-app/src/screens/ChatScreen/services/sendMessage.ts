import { Socket } from "socket.io-client";
import getCurrentTime from "../../../utils/getCurrentTime";
import { AppDispatch } from "../../../store";
import { addMessage } from "../../../store/slices/messagesSlice";

const sendMessage = (
	type: MessageType,
	currentMessage: string,
	userID: string,
	receiverId: string,
	socket: Socket,
	// setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
	dispatch: AppDispatch,
	setCurrentMessage: React.Dispatch<React.SetStateAction<string>>
) => {
	if (!socket) {
		//   Alert.alert("Error", "Socket connection not established!");
		return;
	}

	if (type === "text" && currentMessage.trim()) {
		const newMessage: Message = {
			id: `${Date.now()}`,
			type,
			text: currentMessage.trim(),
			senderID: userID,
			timestamp: getCurrentTime(),
			status: "sent",
			receiverID: receiverId,
		};

		// Update local state
		// setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
		dispatch(addMessage(newMessage));
		setCurrentMessage("");

		socket.emit("send_message", { ...newMessage });
	}
};

export default sendMessage;