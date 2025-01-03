import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../routes/auth-stack";
import Home from "../../screens/Home";
import ChatScreen from "../../screens/ChatScreen";
import { useEffect } from "react";
import { getSocket } from "../../services/socket";
import { useDispatch } from "react-redux";
import { setContacts, updateContact } from "../../store/slices/contactsSlice";
import { SERVER_URL } from "../../apis";
import axios from "axios";
import { Alert } from "react-native";

const AuthStack = createNativeStackNavigator<AuthStackRoutes>();

export default function AuthStackLayout() {
  const socket = getSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receive_message", ((message: Message) => {
      console.log("ab mesage aa rha", message)
      dispatch(updateContact(message));
    }))
  }, [dispatch, socket]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      dispatch(setContacts(response.data));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Alert.alert("Error", "Failed to fetch contacts!");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
