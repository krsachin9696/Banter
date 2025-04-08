import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";
import sizes from "../../../constants/sizes";

export const styles = StyleSheet.create({
    homeBody: {
        height: "100%",
        backgroundColor: colors.BLUE_GREEN,
        display: "flex",
        flexDirection: "column",
    },
    heading: {
        padding: sizes.CARD_INTERNAL_PADDING,
        height: "15%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    banterContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: sizes.CARD_INTERNAL_PADDING,
    },
    banter: {
        fontSize: sizes.TEXT.mainHeading,
        fontStyle: "normal",
        fontWeight: "bold",
        color: colors.WHITE,
    },
    headingText: {
        fontSize: sizes.TEXT.heading,
        fontWeight: "bold",
        color: colors.WHITE,
    },
    contactSection: {
        padding: sizes.CARD_INTERNAL_PADDING,
        backgroundColor: colors.WHITE,
        height: "85%",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    contactSectionHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: sizes.CARD_INTERNAL_PADDING,
    },
    searchBox: {
        padding: sizes.CARD_INTERNAL_PADDING,
        backgroundColor: colors.GREY,
        borderRadius: 30,
        flex: 1,
    },
    messagesCard: {
        // paddingVertical: sizes.CARD_INTERNAL_PADDING,
    },
    messagesCardHeading: {
        fontWeight: "bold",
        fontSize: sizes.TEXT.heading,
    },
    contactProfileCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: sizes.CARD_INTERNAL_PADDING,
        borderRadius: sizes.BORDER_RADIUS,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: sizes.CARD_INTERNAL_PADDING,
    },
    nameMessage: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    nameTime: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contactName: {
        fontSize: sizes.TEXT.miniHeading,
        fontWeight: "bold",
    },
    contactTime: {
        fontSize: sizes.TEXT.mini,
        marginBottom: 5,
    },
    contactMessage: {
        fontSize: sizes.TEXT.basic,
        color: "#808080",
    },
    messageLine: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    messageStatusText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    unreadBadge: {
        backgroundColor: colors.BLUE_GREEN,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    unreadBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});