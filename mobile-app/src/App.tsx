import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "./screens/ChatScreen";
import Home from "./screens/Home/";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ROOT_STACK_ROUTES, RootStackRoutes } from "./routes/root_satck";
import RegisterScreen from "./screens/registration";

const Stack = createNativeStackNavigator<RootStackRoutes>();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName={ROOT_STACK_ROUTES.REGISTRATION}>
            <Stack.Screen
              name={ROOT_STACK_ROUTES.REGISTRATION}
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={ROOT_STACK_ROUTES.HOME_SCREEN}
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={ROOT_STACK_ROUTES.CHAT_SCREEN}
              component={ChatScreen}
              options={({ route }) => {
                const { name } = route.params;
                return {
                  headerTitle: name,
                };
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
