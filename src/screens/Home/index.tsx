import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import sizes from '../../constants/sizes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import ContactCard from './components/contactCard';

const contacts = [
  { id: '1', name: 'John Doe', latestMessage: 'Hey! How are you?', time: '10:30 AM' },
  { id: '2', name: 'Jane Smith', latestMessage: 'Are we still meeting?', time: '9:15 AM' },
  { id: '3', name: 'Bob Johnson', latestMessage: 'Call me when you’re free.', time: 'Yesterday' },
  { id: '4', name: 'Alice Brown', latestMessage: 'Got the documents, thanks!', time: 'Monday' },
  { id: '5', name: 'Charlie Davis', latestMessage: 'See you soon!', time: 'Last week' },
  { id: '6', name: 'John Doe', latestMessage: 'Hey! How are you?', time: '10:30 AM' },
  { id: '7', name: 'Jane Smith', latestMessage: 'Are we still meeting?', time: '9:15 AM' },
  { id: '8', name: 'Bob Johnson', latestMessage: 'Call me when you’re free.', time: 'Yesterday' },
  { id: '9', name: 'Alice Brown', latestMessage: 'Got the documents, thanks!', time: 'Monday' },
  { id: '0', name: 'Charlie Davis', latestMessage: 'See you soon!', time: 'Last week' },
];

const Home = ({ navigation }: { navigation: any }) => {

  return (
    <View style={styles.homeBody}>
     <StatusBar backgroundColor={colors.BLUE_GREEN} barStyle="light-content" />
      <View style={styles.heading}>
        <View style={styles.banterContainer}>
          <Text style={styles.banter}>Banter</Text>
          <Entypo name="grid" size={24} color="white" />
        </View>
        <Text style={styles.headingText}>Hi Sachin!!</Text>
      </View>
      <View style={styles.contactSection}>
        <View style={styles.contactSectionHeading}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={24} color="black" />
          </View>
        </View>
        <View style={styles.messagesCard}>
          <Text style={styles.messagesCardHeading}>Messages</Text>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={(item) => ContactCard({ ...item, navigation })}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};


export default Home;

const styles = StyleSheet.create({
  homeBody: {
    height: '100%',
    backgroundColor: colors.BLUE_GREEN,
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    padding: sizes.CARD_INTERNAL_PADDING,
    height: '15%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  banterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingRight: sizes.CARD_INTERNAL_PADDING,
  },
  banter: {
    fontSize: sizes.TEXT.mainHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  headingText: {
    fontSize: sizes.TEXT.heading,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  contactSection: {
    padding: sizes.CARD_INTERNAL_PADDING,
    backgroundColor: colors.WHITE,
    height: '85%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  contactSectionHeading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.CARD_INTERNAL_PADDING,
  },
  searchBox: {
    padding: sizes.CARD_INTERNAL_PADDING,
    backgroundColor: colors.GREY,
    borderRadius: 30,
    flex: 1,
  },
  messagesCard: {
    // paddingVertical: sizes.CARD_INTERNAL_PADDING,
  },
  messagesCardHeading: {
    fontWeight: 'bold',
    fontSize: sizes.TEXT.heading,
  },
});
