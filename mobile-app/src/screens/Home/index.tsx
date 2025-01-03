// import React, { useCallback, useContext, useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   FlatList,
//   StatusBar,
//   Alert,
//   RefreshControl,
// } from "react-native";
// import colors from "../../constants/colors";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import Entypo from "@expo/vector-icons/Entypo";
// import ContactCard from "./components/contactCard";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import axios from "axios";
// import { SERVER_URL } from "../../apis";
// import { AuthStackRoutes } from "../../routes/auth-stack";
// import UserContext from "../../context/userContext";
// import { getSocket } from "../../services/socket";
// import { styles } from "./styles";

// interface HomeScreenProps
//   extends NativeStackScreenProps<
//     AuthStackRoutes
//   > {}

// const Home = ({ route, navigation }: HomeScreenProps) => {
//   const context = useContext(UserContext);
//   // const { socket } = useSocket();
//   const socket = getSocket();

//   if (!context) {
//     throw new Error("Home screen must be used without a UserContextProvider");
//   }
  
//   const { user } = context;

//   const [contacts, setContacts] = useState<ContactInfoProps[]>();
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${SERVER_URL}/users`);  
//       // console.log(response.data, "initial response ");
//       setContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//       Alert.alert("Error", "Failed to fetch contacts!");
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       const handleMessage = (message: Message) => {
//         setContacts((prevContacts) => {
//           return prevContacts?.map((contact) => {
//             if (contact.userID === message.senderID) {
//               return {
//                 ...contact,
//                 latestMessage: message.type === "text" ? message.text : "New Media",
//                 time: message.timestamp,
//               };
//             }
//             return contact;
//           });
//         });
//       };
  
//       socket.on("receive_message", handleMessage);
//     }
//   }, [socket]);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchContacts();
//     setRefreshing(false);
//   }, []);

//   return (
//     <View style={styles.homeBody}>
//       <StatusBar backgroundColor={colors.BLUE_GREEN} barStyle="light-content" />
//       <View style={styles.heading}>
//         <View style={styles.banterContainer}>
//           <Text style={styles.banter}>Banter</Text>
//           <Entypo name="grid" size={24} color="white" />
//         </View>
//         <Text style={styles.headingText}>Hi {user?.name}!!</Text>
//       </View>
//       <View style={styles.contactSection}>
//         <View style={styles.contactSectionHeading}>
//           <View style={styles.searchBox}>
//             <FontAwesome name="search" size={24} color="black" />
//           </View>
//         </View>
//         <View style={styles.messagesCard}>
//           <Text style={styles.messagesCardHeading}>Messages</Text>
//           <FlatList
//             data={contacts}
//             keyExtractor={(item) => item.userID}
//             renderItem={(item) =>
//               ContactCard({ ...item, navigation })
//             }
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={handleRefresh}
//               />
//             }
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Home;






import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  RefreshControl,
} from "react-native";
import colors from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ContactCard from "./components/contactCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { SERVER_URL } from "../../apis";
import { AuthStackRoutes } from "../../routes/auth-stack";
import UserContext from "../../context/userContext";
import { getSocket } from "../../services/socket";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setContacts } from "../../store/slices/contactsSlice";

interface HomeScreenProps
  extends NativeStackScreenProps<
    AuthStackRoutes
  > {}

const Home = ({ route, navigation }: HomeScreenProps) => {
  const context = useContext(UserContext);
  // const { socket } = useSocket();
  const socket = getSocket();
  const dispatch = useDispatch();

  if (!context) {
    throw new Error("Home screen must be used without a UserContextProvider");
  }
  
  const { user } = context;

  const contacts = useSelector((state: RootState) => state.contacts.contacts)

  // const [contacts, setContacts] = useState<ContactInfoProps[]>();
  const [refreshing, setRefreshing] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);  
      // console.log(response.data, "initial response ");
      // setContacts(response.data);
      dispatch(setContacts(response.data));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Alert.alert("Error", "Failed to fetch contacts!");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.homeBody}>
      <StatusBar backgroundColor={colors.BLUE_GREEN} barStyle="light-content" />
      <View style={styles.heading}>
        <View style={styles.banterContainer}>
          <Text style={styles.banter}>Banter</Text>
          <Entypo name="grid" size={24} color="white" />
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
          <Text style={styles.messagesCardHeading}>Messages</Text>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.userID}
            renderItem={(item) =>
              ContactCard({ ...item, navigation })
            }
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