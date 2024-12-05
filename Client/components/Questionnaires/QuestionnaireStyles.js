import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexGrow: 1,
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
    height: 45,
    borderColor: "gray",
    marginBottom: "5%",
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
  pickerContainer: {
    marginBottom: "5%",
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "80%",
    height: "7%",
    borderColor: "gray",
    borderRadius: 10,
  },
  picker: {
    width: "100%",
    height: "7%",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    color: Colors.text,
    fontSize: 13,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centers the content vertically
    paddingBottom: 20, // Adds padding at the bottom
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expertiseText: {
    borderWidth: 1,
    padding: "2%",
    textAlign: "center",
    borderColor: "gray",
    borderRadius: 10,
  },
  closeButton: {
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // This will space out the radio buttons
    alignItems: "center",
  },
});
