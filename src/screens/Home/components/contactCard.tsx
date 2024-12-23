import avatarImage from '../../../../assets/avatar.png';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sizes from '../../../constants/sizes';

interface messageItem {
  id: string;
  name: string;
  latestMessage: string;
  time: string;
}

const ContactCard = ({ item, navigation }: { item: messageItem; navigation: any }) => (
  <TouchableOpacity
    style={styles.contactProfileCard}
    onPress={() => navigation.navigate('ChatScreen', { contactName: item.name })}
  >
    <Image source={avatarImage} style={styles.avatar} />
    <View style={styles.nameMessage}>
      <View style={styles.nameTime}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactTime}>{item.time}</Text>
      </View>
      <Text style={styles.contactMessage}>{item.latestMessage}</Text>
    </View>
  </TouchableOpacity>
);

export default ContactCard;
const styles = StyleSheet.create({
  contactProfileCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.CARD_INTERNAL_PADDING,
    borderRadius: sizes.BORDER_RADIUS,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: sizes.CARD_INTERNAL_PADDING,
  },
  nameMessage: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  nameTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactName: {
    fontSize: sizes.TEXT.miniHeading,
    fontWeight: 'bold',
  },
  contactTime: {
    fontSize: sizes.TEXT.mini,
    marginBottom: 5,
  },
  contactMessage: {
    fontSize: sizes.TEXT.basic,
    color: '#808080',
  },
});

