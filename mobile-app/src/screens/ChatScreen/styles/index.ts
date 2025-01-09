import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";
import sizes from "../../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: sizes.CARD_INTERNAL_PADDING,
    backgroundColor: colors.GREY,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.DARK_GREY,
  },
  introContainer: {
    padding: sizes.CARD_INTERNAL_PADDING,
    paddingTop: 0,
  },
  introText: {
    fontSize: sizes.TEXT.mini,
    color: colors.DARK_GREY,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.BLUE_GREEN,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: sizes.CARD_INTERNAL_PADDING,
  },
  messageContainer: {
    marginVertical: 3,
  },
  userContainer: {
    alignItems: "flex-end",
  },
  otherContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "90%",
    padding: sizes.MESSAGE_CONTAINER_PADDING,
    borderRadius: sizes.BORDER_RADIUS,
  },
  userBubble: {
    backgroundColor: colors.BLUE_GREEN,
  },
  otherBubble: {
    backgroundColor: colors.DARK_GREY,
  },
  messageText: {
    fontSize: 16,
    color: colors.WHITE,
  },
  messageInfo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  timestamp: {
    fontSize: sizes.TEXT.mini,
    color: colors.GREY,
    marginRight: 3,
  },
  icon: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  textInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.GREY,
    borderRadius: 20,
    paddingHorizontal: sizes.CARD_INTERNAL_PADDING,
    fontSize: sizes.TEXT.input,
  },
  sendButton: {
    padding: 12,
    backgroundColor: colors.BLUE_GREEN,
    borderRadius: 25,
  },
  media: {
    width: 200,
    height: 150,
    borderRadius: sizes.BORDER_RADIUS,
  },
  mediaButton: {
    paddingHorizontal: 8,
  },
});

export default styles;