import { StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

const ChatScreen = ({ route }: { route: any }) => {
  const { contactName } = route.params;

  return (
    <View style={styles.container}>
            <StatusBar
              backgroundColor={colors.WHITE}
              barStyle="dark-content"
            />
      <Text style={styles.heading}>Chat with {contactName}</Text>
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

export default ChatScreen;