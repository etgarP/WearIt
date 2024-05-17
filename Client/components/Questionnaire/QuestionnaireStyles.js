import { StyleSheet } from "react-native";
import { Colors } from "../colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
    },
    body: {
        flexDirection: "column",
        alignItems: "center",
        height: "80%",
        margin: "5%",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        color: Colors.text,
    },
    input: {
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        marginVertical: "3%",
        paddingHorizontal: 10,
    },
    previewContainer: {
        width: "80%",
        height: 200,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
