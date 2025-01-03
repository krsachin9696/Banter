import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import colors from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getSocket } from "../../services/socket";
import styles from "./styles";
import RenderMessage from "./components/renderMessage";
import getCurrentTime from "../../utils/getCurrentTime";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../routes/auth-stack";
import UserContext from "../../context/userContext";

interface ChatScreen
  extends NativeStackScreenProps<
    AuthStackRoutes,
    AUTH_STACK_ROUTES.CHAT_SCREEN
  > { }

export default function ChatScreen({
  navigation,
  route,
}: ChatScreen): JSX.Element {
  const { id: receiverId, name } = route.params;

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Home screen must be used without a UserContextProvider");
  }

  const { user } = context;

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const socket = getSocket();

  const handleSendMessage = (type: MessageType) => {
    if (!socket) {
      Alert.alert("Error", "Socket connection not established!");
      return;
    }

    if (type === "text" && currentMessage.trim()) {
      const newMessage: Message = {
        id: `${Date.now()}`,
        type,
        text: currentMessage.trim(),
        senderID: user?.id || "sksd",
        timestamp: getCurrentTime(),
        status: "sent",
        receiverID: receiverId,
      };

      // Update local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage("");

      socket.emit("send_message", { ...newMessage });
    }
  };

  const renderIntro = () => (
    <View style={styles.introContainer}>
      <Text style={styles.introText}>
        This is the very beginning of your direct message history with{" "}
        <Text style={styles.boldText}>{name}</Text>.
      </Text>
    </View>
  );

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on("receive_message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    flatListRef.current?.scrollToEnd({ animated: true });
    return () => {
      if (socket) {
        socket.off("receive_message");
      }
    };
  }, [socket, messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderMessage item={item} currentUser={user!} />}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderIntro}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
          // onPress={() => pickMedia("image")}
          >
            <Ionicons name="image" size={24} color={colors.DARK_GREY} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Message..."
            value={currentMessage}
            onChangeText={setCurrentMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleSendMessage("text")}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

