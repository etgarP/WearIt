import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { styles } from "./AuthenticationStyles";
import { AppObjectContext } from "../appNavigation/appObjectProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../constants/api";
import BackgroundWrapper from "../backgroundWrapper";

export default function SignUpScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("designer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [url, setUrl] = useState("");
  const { setUserDetails } = useContext(AppObjectContext);

  // Update selectedTab only when route.params.selectedTab changes
  useEffect(() => {
    if (route.params?.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params?.selectedTab]);
  useEffect(() => {
    setUrl(`${constants.baseAddress}${selectedTab}/auth/signup`);
  }, [selectedTab]);

  const sendRequest = async (authenticationInfo) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authenticationInfo),
      });
      // Check if the request was successful
      if (response.ok) {
        // Parse the JSON response if needed
        const responseData = await response.json();
        await AsyncStorage.setItem("userToken", responseData.key);
        await AsyncStorage.setItem("selectedTab", selectedTab);
        setUserDetails({
          token: responseData.key,
        });

        selectedTab == "designer"
          ? navigation.replace("stylistQuestionnaire")
          : navigation.replace("clientQuestionnaire");
      } else {
        const errorData = await response.json(); // Parse error response from server
        console.error("Error sending data:", response.statusText);

        // Check if it's a duplicate key error based on the server's response
        if (
          response.status === 400 &&
          errorData.includes("Username already exists")
        ) {
          Alert.alert(
            "Error",
            "Username already exists. Please try another one."
          );
        } else {
          Alert.alert("Error", "Failed to sign up. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert(
        "Error",
        "Failed to sign in. Please check your network connection."
      );
    }
  };

  // Validation for sign-up with trimming and length checks
  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedUsername) {
      Alert.alert("Error", "Please enter your username.");
      return;
    }
    if (!trimmedPassword) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    if (trimmedUsername.length > 14) {
      Alert.alert("Error", "Username cannot exceed 14 characters.");
      return;
    }
    if (trimmedPassword.length > 14) {
      Alert.alert("Error", "Password cannot exceed 14 characters.");
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    const authenticationInfo = {
      username,
      password,
    };
    await sendRequest(authenticationInfo);
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/logo.png")} // path to your image
          resizeMode="contain"
          style={{
            marginBottom: "10%",
            width: "100%",
            height: "8%",
            resizeMode: "contain",
          }}
        />
        {/* Header - Sign Up */}
        <Text style={styles.titleText}>SIGN UP</Text>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "designer" && styles.activeTab]}
            onPress={() => setSelectedTab("designer")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "designer" && styles.activeTabText,
              ]}
            >
              STYLIST
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "client" && styles.activeTab]}
            onPress={() => setSelectedTab("client")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "client" && styles.activeTabText,
              ]}
            >
              CUSTOMER
            </Text>
          </TouchableOpacity>
        </View>

        {/* Username, Password, and Confirm Password Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            placeholderTextColor="#A9A9A9"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="CONFIRM PASSWORD"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={async () => await handleSignUp()}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SignIn", {
              selectedTab: selectedTab,
            })
          }
        >
          <Text style={styles.linkText}>
            ALREADY HAVE AN ACCOUNT?{" "}
            <Text style={[styles.linkText, { color: "black" }]}>SIGN IN</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundWrapper>
  );
}
