import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  RefreshControl,
} from "react-native";
import colors from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ContactCard from "./components/contactCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackRoutes } from "../../routes/auth-stack";
import UserContext from "../../context/userContext";
import { getSocket } from "../../services/socket";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { loadContacts, updateContact } from "../../store/slices/contactsSlice";

interface HomeScreenProps
  extends NativeStackScreenProps<AuthStackRoutes> { }

const Home = ({ route, navigation }: HomeScreenProps) => {
  const context = useContext(UserContext);
  const socket = getSocket();
  const dispatch = useDispatch<AppDispatch>();

  if (!context) {
    throw new Error("Home screen must be used without a UserContextProvider");
  }

  const { user } = context;
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const loading = useSelector((state: RootState) => state.contacts.loading);
  const error = useSelector((state: RootState) => state.contacts.error);
  const [refreshing, setRefreshing] = useState(false);

  // Handle pull-to-refresh action
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user) {
      await dispatch(loadContacts(user));
    }
    setRefreshing(false);
  }, [dispatch, user]);

  return (
    <View style={styles.homeBody}>
      <StatusBar backgroundColor={colors.BLUE_GREEN} barStyle="light-content" />
      <View style={styles.heading}>
        <View style={styles.banterContainer}>
          <Text style={styles.banter}>Banter</Text>
          <Entypo name="grid" size={24} color="white" onPress={handleRefresh} />
        </View>
        <Text style={styles.headingText}>Hi {user?.name}!!</Text>
      </View>

      <View style={styles.contactSection}>
        <View style={styles.contactSectionHeading}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={24} color="black" />
          </View>
        </View>

        <View style={styles.messagesCard}>
          {loading && <Text>Loading contacts...</Text>}
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <Text style={styles.messagesCardHeading}>Messages</Text>

          <FlatList
            data={contacts}
            keyExtractor={(item) => item.userID}
            renderItem={(item) => (
              <ContactCard {...item} navigation={navigation} />
            )}
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
