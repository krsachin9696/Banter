import avatarImage from "../../../../assets/avatar.png";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../../routes/auth-stack";
import { styles } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../constants/colors";

interface ContactCardProps {
  item: ContactInfoProps;
  navigation: NativeStackNavigationProp<AuthStackRoutes>;
}

const ContactCard = ({ item, navigation }: ContactCardProps) => {
  return (
    <TouchableOpacity
      style={styles.contactProfileCard}
      onPress={() =>
        navigation.navigate(AUTH_STACK_ROUTES.CHAT_SCREEN, {
          id: item.userID,
          name: item.name,
        })
      }>
      <Image source={avatarImage} style={styles.avatar} />
      <View style={styles.nameMessage}>
        <View style={styles.nameTime}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactTime}>{item.time}</Text>
        </View>
        <View style={styles.messageLine}>
          <View style={styles.messageStatusText}>
            <MaterialCommunityIcons
              name={
                item.status === "sent"
                  ? "check"
                  : item.status === "delivered"
                    ? "check-all"
                    : "check-all"
              }
              size={16}
              color={item.status === "read" ? colors.BLUE_GREEN : colors.GREY}
            // style={styles.icon}
            />
            <Text
              style={styles.contactMessage}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.latestMessage}
            </Text>
          </View>

          {item.unreadMessages > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadMessages}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default ContactCard;