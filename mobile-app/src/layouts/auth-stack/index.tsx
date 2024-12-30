import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AUTH_STACK_ROUTES, AuthStackRoutes } from "../../routes/auth-stack";
import Home from "../../screens/Home";
import ChatScreen from "../../screens/ChatScreen";

const AuthStack = createNativeStackNavigator<AuthStackRoutes>();

export default function AuthStackLayout() {
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
