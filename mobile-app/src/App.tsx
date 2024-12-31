import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ROOT_STACK_ROUTES, RootStackRoutes } from "./routes/root-satck";
import UnauthStackLayout from "./layouts/unauth-stack";
import AuthStackLayout from "./layouts/auth-stack";
import UserContextProvider from "./context/UserContextProvider";

const Stack = createNativeStackNavigator<RootStackRoutes>();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName={ROOT_STACK_ROUTES.UNAUTH_STACK_LAYOUT}>
              <Stack.Screen
                name={ROOT_STACK_ROUTES.UNAUTH_STACK_LAYOUT}
                component={UnauthStackLayout}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROOT_STACK_ROUTES.AUTH_STACK_LAYOUT}
                component={AuthStackLayout}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </UserContextProvider>
  );
}
