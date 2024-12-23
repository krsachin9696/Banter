import { StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROOT_STACK_ROUTES, RootStackRoutes } from "../../routes/root_satck";

interface ChatScreen extends NativeStackScreenProps<RootStackRoutes, ROOT_STACK_ROUTES.CHAT_SCREEN> { }

export default function ChatScreen({ navigation, route }: ChatScreen): JSX.Element {
  const { id, name } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.WHITE}
        barStyle="dark-content"
      />
      <Text style={styles.heading}>Chat with {name}</Text>
      {/* Your chat UI goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
