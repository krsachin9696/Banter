import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../routes/auth-stack";
import Home from "../../screens/Home";
import ChatScreen from "../../screens/ChatScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { loadContacts, updateContact } from "../../store/slices/contactsSlice"; 
import { getSocket } from "../../services/socket";
import UserContext from "../../context/userContext";

const AuthStack = createNativeStackNavigator<AuthStackRoutes>();

export default function AuthStackLayout() {
  const socket = getSocket();
  const dispatch = useDispatch<AppDispatch>();

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Home screen must be used without a UserContextProvider");
  }
  const { user } = context;

  // Get loading and error states from Redux store
  const { loading, error } = useSelector((state: RootState) => state.contacts);

  // Fetch contacts when the user is available
  useEffect(() => {
    if (user) {
      dispatch(loadContacts(user)); 
    }
  }, [dispatch, user]);

  // Socket listener for received messages
  useEffect(() => {
    socket.on("receive_message", (message: Message) => {
      dispatch(updateContact(message)); // Update contact on new message
    });

    // Cleanup the socket listener when component unmounts
    // return () => {
    //   socket.off("receive_message");
    // };
  }, [dispatch, socket]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Show loading or error message */}
      {loading && <Text>Loading contacts...</Text>}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <AuthStack.Navigator initialRouteName={AUTH_STACK_ROUTES.HOME_SCREEN}>
        <AuthStack.Screen
          name={AUTH_STACK_ROUTES.HOME_SCREEN}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name={AUTH_STACK_ROUTES.CHAT_SCREEN}
          component={ChatScreen}
          options={({ route }) => {
            const { name } = route.params;
            return {
              headerTitle: name,
            };
          }}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
}
