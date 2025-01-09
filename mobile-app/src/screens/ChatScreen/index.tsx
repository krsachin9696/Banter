import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import colors from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getSocket } from "../../services/socket";
import styles from "./styles";
import RenderMessage from "./components/renderMessage";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../routes/auth-stack";
import UserContext from "../../context/userContext";
import renderIntro from "./components/renderIntro";
import sendMessage from "./services/sendMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setCurrentChat, setMessages } from "../../store/slices/messagesSlice";
import { fetchConversation } from "./services/fetchConversation";

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

  const dispatch = useDispatch<AppDispatch>();
  const { messages, currentChat } = useSelector((state: RootState) => state.messages);

  const [currentMessage, setCurrentMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const socket = getSocket();

  useEffect(() => {
    // Set the current chat to Redux store
    dispatch(setCurrentChat(receiverId))

    if (user?.id) {
      fetchConversation(user.id, receiverId, dispatch);
    }

    // Cleanup on component unmount
    return () => {
      dispatch(setCurrentChat(null));
      dispatch(setMessages([]));
    };
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
          ListHeaderComponent={renderIntro(name)}
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
            onPress={() => sendMessage(
              "text",
              currentMessage,
              user?.id!,
              receiverId,
              socket,
              dispatch,
              setCurrentMessage
            )}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

