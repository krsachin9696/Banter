import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  RefreshControl,
} from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ContactCard from "./components/contactCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { SERVER_URL } from "../../apis";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../routes/auth-stack";

interface HomeScreenProps
  extends NativeStackScreenProps<
    AuthStackRoutes,
    AUTH_STACK_ROUTES.HOME_SCREEN
  > {}

const Home = ({ route, navigation }: HomeScreenProps) => {
  const currentUser = route.params.currentUser;
  const [contacts, setContacts] = useState<ContactInfoProps[]>();
  const [refreshing, setRefreshing] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Alert.alert("Error", "Failed to fetch contacts!");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.homeBody}>
      <StatusBar backgroundColor={colors.BLUE_GREEN} barStyle="light-content" />
      <View style={styles.heading}>
        <View style={styles.banterContainer}>
          <Text style={styles.banter}>Banter</Text>
          <Entypo name="grid" size={24} color="white" />
        </View>
        <Text style={styles.headingText}>Hi {currentUser.name}!!</Text>
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
            renderItem={(item) =>
              ContactCard({ ...item, navigation, currentUser })
            }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeBody: {
    height: "100%",
    backgroundColor: colors.BLUE_GREEN,
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    padding: sizes.CARD_INTERNAL_PADDING,
    height: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  banterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: sizes.CARD_INTERNAL_PADDING,
  },
  banter: {
    fontSize: sizes.TEXT.mainHeading,
    fontStyle: "normal",
    fontWeight: "bold",
    color: colors.WHITE,
  },
  headingText: {
    fontSize: sizes.TEXT.heading,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  contactSection: {
    padding: sizes.CARD_INTERNAL_PADDING,
    backgroundColor: colors.WHITE,
    height: "85%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  contactSectionHeading: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    fontSize: sizes.TEXT.heading,
  },
});
