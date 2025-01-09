import { Image, Text, View } from "react-native";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../constants/colors";

  const RenderMessage = ({ item, currentUser }: { item: Message, currentUser: User }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderID == currentUser.id
          ? styles.userContainer
          : styles.otherContainer,
      ]}>
      <View
        style={[
          styles.messageBubble,
          item.senderID === currentUser.id
            ? styles.userBubble
            : styles.otherBubble,
        ]}>
        {item.type === "text" && (
          <Text style={styles.messageText}>{item.text}</Text>
        )}
        {item.type === "image" && (
          <Image
            source={{ uri: item.mediaUri }}
            style={styles.media}
            resizeMode="cover"
          />
        )}
        <View style={styles.messageInfo}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.senderID === currentUser.id && item.status && (
            <MaterialCommunityIcons
              name={
                item.status === "sent"
                  ? "check"
                  : item.status === "delivered"
                  ? "check-all"
                  : "check-all"
              }
              size={16}
              color={item.status === "read" ? "black" : colors.GREY}
              style={styles.icon}
            />
          )}
        </View>
      </View>
    </View>
);
  
export default RenderMessage;