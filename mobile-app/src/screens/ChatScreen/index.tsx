import React, { useEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import colors from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROOT_STACK_ROUTES, RootStackRoutes } from "../../routes/root_satck";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sizes from "../../constants/sizes";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";

interface ChatScreen extends NativeStackScreenProps<RootStackRoutes, ROOT_STACK_ROUTES.CHAT_SCREEN> { }

type MessageType = "text" | "image" | "video";
type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: string;
  type: MessageType;
  text?: string;
  mediaUri?: string;
  sender: "user" | "other";
  timestamp: string;
  status?: MessageStatus;
}

export default function ChatScreen({ navigation, route }: ChatScreen): JSX.Element {
  const { id, name } = route.params;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "text",
      text: "Hello! How are you? Hello! How are you?",
      sender: "other",
      timestamp: "10:00 AM",
    },
    {
      id: "2",
      type: "text",
      text: "I'm doing well, thanks! How about you?",
      sender: "user",
      timestamp: "10:01 AM",
      status: "read",
    },
    {
      id: "3",
      type: "text",
      text: "Hello! How are you? Hello! How are you?",
      sender: "other",
      timestamp: "10:00 AM",
    },
    {
      id: "4",
      type: "text",
      text: "I'm doing well, thanks! How about you?",
      sender: "user",
      timestamp: "10:01 AM",
      status: "delivered",
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");

  const flatListRef = useRef<FlatList>(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleSendMessage = (type: MessageType, content?: string) => {
    if (type === "text" && currentMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `${prevMessages.length + 1}`,
          type,
          text: currentMessage.trim(),
          sender: "user",
          timestamp: getCurrentTime(),
          status: "sent",
        },
      ]);
      setCurrentMessage("");
    } else if ((type === "image" || type === "video") && content) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `${prevMessages.length + 1}`,
          type,
          mediaUri: content,
          sender: "user",
          timestamp: getCurrentTime(),
          status: "sent",
        },
      ]);
    }
  };

  const pickMedia = async (type: MessageType) => {
    let result;
    if (type === "image") {
      result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
    }
    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      handleSendMessage(type, result.assets[0].uri);
    }
    
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.sender === "user" ? styles.userBubble : styles.otherBubble,
        ]}
      >
        {item.type === "text" && <Text style={styles.messageText}>{item.text}</Text>}
        {item.type === "image" && (
          <Image source={{ uri: item.mediaUri }} style={styles.media} resizeMode="cover" />
        )}
        <View style={styles.messageInfo}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.sender === "user" && item.status && (
            <MaterialCommunityIcons
              name={
                item.status === "sent"
                  ? "check"
                  : item.status === "delivered"
                  ? "check-all"
                  : "check-all"
              }
              size={16}
              color={item.status === "read" ? 'black' : colors.GREY}
              style={styles.icon}
            />
          )}
        </View>
      </View>
    </View>
  );

  const renderIntro = () => (
    <View style={styles.introContainer}>
      <Text style={styles.introText}>
        This is the very beginning of your direct message history with <Text style={styles.boldText}>{name}</Text>.
      </Text>
    </View>
  );

  useEffect(() => {
    // Scroll to the bottom when messages change
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80} 
>
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            // contentContainerStyle={styles.messagesContainer}
            contentContainerStyle={
              styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderIntro}
        />
        
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={() => pickMedia("image")}>
          <Ionicons name="image" size={24} color={colors.DARK_GREY} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Message..."
          value={currentMessage}
          onChangeText={setCurrentMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage("text")}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
      </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: sizes.CARD_INTERNAL_PADDING,
    backgroundColor: colors.GREY,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.DARK_GREY,
  },
  introContainer: {
    padding: sizes.CARD_INTERNAL_PADDING,
    paddingTop: 0,
  },
  introText: {
    fontSize: sizes.TEXT.mini,
    color: colors.DARK_GREY,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.BLUE_GREEN,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: sizes.CARD_INTERNAL_PADDING,
  },
  messageContainer: {
    marginVertical: 3,
  },
  userContainer: {
    alignItems: "flex-end",
  },
  otherContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "90%",
    padding: sizes.MESSAGE_CONTAINER_PADDING,
    borderRadius: sizes.BORDER_RADIUS,
  },
  userBubble: {
    backgroundColor: colors.BLUE_GREEN,
  },
  otherBubble: {
    backgroundColor: colors.DARK_GREY,
  },
  messageText: {
    fontSize: 16,
    color: colors.WHITE,
  },
  messageInfo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  timestamp: {
    fontSize: sizes.TEXT.mini,
    color: colors.GREY,
    marginRight: 3,
  },
  icon: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    gap: 6,
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  textInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.GREY,
    borderRadius: 20,
    paddingHorizontal: sizes.CARD_INTERNAL_PADDING,
    fontSize: sizes.TEXT.input,
  },
  sendButton: {
    padding: 12,
    backgroundColor: colors.BLUE_GREEN,
    borderRadius: 25,
  },
  media: {
    width: 200,
    height: 150,
    borderRadius: sizes.BORDER_RADIUS,
  },
  mediaButton: {
    paddingHorizontal: 8,
  },
});
