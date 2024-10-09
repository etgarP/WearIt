import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 20,
  },
  signInText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTab: {
    borderColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#A9A9A9",
  },
  activeTabText: {
    color: Colors.text,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#A9A9A9",
    marginBottom: 40,
  },
  signInButton: {
    backgroundColor: Colors.btnBackground,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  signInButtonText: {
    color: Colors.btnText,
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#A9A9A9",
    marginTop: 20,
  },
});