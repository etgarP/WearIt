import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

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
    },
    footer: {
        flexDirection: "row",
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        color: Colors.text,
        fontFamily: "kalam",
    },
    input: {
        width: "80%",
        height: "7%",
        borderColor: "gray",
        borderWidth: 1,
        marginVertical: "3%",
        paddingHorizontal: 10,
        borderRadius: 10, // Adjust the value as needed for the desired roundness
    },
    previewContainer: {
        width: "70%",
        aspectRatio: 2 / 3, // Aspect ratio for full-body photos
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        margin: "5%",
        borderRadius: 10, // Adjust the value as needed for the desired roundness
    },
    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain", // Keep the aspect ratio and fit the entire image within the container
        borderRadius: 10, // Adjust the value to match the previewContainer's borderRadius
    },
    pictureBtn: {
        backgroundColor: Colors.btnBackground,
        padding: "3%",
        borderRadius: 30,
        alignItems: "center",
    },
    pictureBtnText: {
        color: Colors.btnText,
        fontSize: 16,
    },
    nextContainer: {
        flex: 1,
        alignItems: "flex-end",
        margin: "5%",
    },
    backContainer: {
        flex: 1,
        alignItems: "flex-start",
        margin: "5%",
    },
});
