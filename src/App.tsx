import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';
import Home from './screens/Home/';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView  style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ChatScreen'
              component={ChatScreen}
              // options={{
              //   headerShown: false
              // }}
            />
          </Stack.Navigator>
        </SafeAreaView>  
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

