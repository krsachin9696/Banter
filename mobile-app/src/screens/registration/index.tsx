import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROOT_STACK_ROUTES } from "../../routes/root-satck";
import { connectSocket } from "../../services/socket";
import { SERVER_URL } from "../../apis";
import { UNAUTH_STACK_ROUTES, UnauthStackRoutes } from "../../routes/unauth-stack";
import { useNavigation } from "@react-navigation/native";

interface RegisterScreenProps
  extends NativeStackScreenProps<
    UnauthStackRoutes,
    UNAUTH_STACK_ROUTES.REGISTER
  > {}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {

  const rootNavigator = useNavigation().getParent();

  const [name, setName] = useState("");

  const handleRegister = async () => {
    console.log("heelo")
    if (!name.trim()) {
      Alert.alert("Error", "Name is required!");
      return;
    }

    try {
    console.log("alkdsjf")
      const response = await axios.post(`${SERVER_URL}/register`, { name });
      const user = response.data.user;
      console.log("kjlkj")

      const socket = connectSocket(user.id);
      socket.emit("register_user", {
        userID: user.id,
      });

      Alert.alert("Success", "Registered successfully!");
      rootNavigator?.navigate(ROOT_STACK_ROUTES.AUTH_STACK_LAYOUT);
    } catch (error) {
      console.error("Registration failed:", error, JSON.stringify(error));
      Alert.alert("Error", "Registration failed!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    padding: 10,
    marginBottom: 20,
  },
});

export default RegisterScreen;
