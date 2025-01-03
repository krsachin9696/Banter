import avatarImage from "../../../../assets/avatar.png";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sizes from "../../../constants/sizes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../../routes/auth-stack";
import { styles } from "../styles";

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
        <Text style={styles.contactMessage}>{item.latestMessage}</Text>
      </View>
    </TouchableOpacity>
  )
};

export default ContactCard;