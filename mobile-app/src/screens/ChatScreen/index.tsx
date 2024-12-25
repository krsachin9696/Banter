import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import colors from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROOT_STACK_ROUTES, RootStackRoutes } from "../../routes/root_satck";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sizes from "../../constants/sizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getSocket } from "../../services/socket";
import styles from "./styles";
import RenderMessage from "./components/renderMessage";

interface ChatScreen
  extends NativeStackScreenProps<
    RootStackRoutes,
    ROOT_STACK_ROUTES.CHAT_SCREEN
  > {}

export default function ChatScreen({
  navigation,
  route,
}: ChatScreen): JSX.Element {
  const { id: receiverId, name, currentUser } = route.params;
  const currentUserId = currentUser.id;

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const socket = getSocket();

  const handleSendMessage = (type: MessageType, content?: string) => {
    if (!socket) {
      Alert.alert("Error", "Socket connection not established!");
      return;
    }

    if (type === "text" && currentMessage.trim()) {
      const newMessage: Message = {
        id: `${Date.now()}`,
        type,
        text: currentMessage.trim(),
        senderID: currentUser.id,
        timestamp: getCurrentTime(),
        status: "sent",
        receiverID: receiverId,
      };

      // Update local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage("");

      socket.emit("send_message", {...newMessage});
    } else if ((type === "image" || type === "video") && content) {
      const newMessage: Message = {
        id: `${Date.now()}`,
        type,
        mediaUri: content,
        senderID: currentUser.id,
        timestamp: getCurrentTime(),
        status: "sent",
        receiverID: receiverId,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("send_message", {
        senderId: currentUserId,
        receiverId,
        message: newMessage.mediaUri,
      });
    }
  };

  const pickMedia = async (type: MessageType) => {
    let result;
    if (type === "image") {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
      });
    }
    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      handleSendMessage(type, result.assets[0].uri);
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
          renderItem={({ item }) => <RenderMessage item={item} currentUser={currentUser} />}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderIntro}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => pickMedia("image")}>
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

