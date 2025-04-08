import { Text, View } from "react-native";
import styles from "../styles";

const renderIntro = (name: string) => (
    <View style={styles.introContainer}>
        <Text style={styles.introText}>
            This is the very beginning of your direct message history with{" "}
            <Text style={styles.boldText}>{name}</Text>.
        </Text>
    </View>
);

export default renderIntro;