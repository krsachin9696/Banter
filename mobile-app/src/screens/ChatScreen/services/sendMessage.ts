import { Socket } from "socket.io-client";
import getCurrentTime from "../../../utils/getCurrentTime";
import { AppDispatch } from "../../../store";
import { addMessage } from "../../../store/slices/messagesSlice";
import { updateContact } from "../../../store/slices/contactsSlice";

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

		const updatingMessage: Message = {
			id: `${Date.now()}`,
			type,
			text: currentMessage.trim(),
			senderID: receiverId,
			timestamp: getCurrentTime(),
			status: "sent",
			receiverID: userID,
		};

		dispatch(updateContact(updatingMessage));

		socket.emit("send_message", { ...newMessage });
	}
};

export default sendMessage;