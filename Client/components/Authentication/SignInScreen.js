import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { styles } from "./AuthenticationStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppObjectContext } from "../appNavigation/appObjectProvider";
import { constants } from "../../constants/api";
import BackgroundWrapper from "../backgroundWrapper";

export default function SignInScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("designer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isSignedInAlready, setIsSignedInAlready] = useState(false);
  const { setUserDetails } = useContext(AppObjectContext);

  useEffect(() => {
    const checkSignInStatus = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      const page = await AsyncStorage.getItem("selectedTab");

      if (storedToken != null) {
        setUserDetails({
          token: storedToken,
        });
        // Navigate to the next screen
        page == "designer"
          ? navigation.replace("designer")
          : navigation.replace("client");
      } else {
        setIsSignedInAlready(true);
      }
    };

    checkSignInStatus();
  }, []); // Only run this effect once

  // Update selectedTab only when route.params.selectedTab changes
  useEffect(() => {
    if (route.params?.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params?.selectedTab]);
  useEffect(() => {
    setUrl(`${constants.baseAddress}${selectedTab}/auth/signin`);
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
          username: username,
        });
        // Navigate to the next screen
        selectedTab == "designer"
          ? navigation.replace("designer")
          : navigation.replace("client");
      } else {
        console.error("Error sending data:", response.statusText);
        Alert.alert("Error", "Failed to sign in. Please try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert(
        "Error",
        "Failed to sign in. Please check your network connection."
      );
    }
  };
  // Validation for sign-in with trimming and length checks
  const handleSignIn = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) {
      Alert.alert("Error", "Please enter your username.");
      return;
    }
    if (!trimmedPassword) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    if (trimmedUsername.length > 80) {
      Alert.alert("Error");
      return;
    }
    if (trimmedPassword.length > 80) {
      Alert.alert("Error");
      return;
    }
    const authenticationInfo = {
      username,
      password,
    };
    await sendRequest(authenticationInfo);
  };

  return (
    isSignedInAlready && (
      <BackgroundWrapper>
        <SafeAreaView style={styles.container}>
          <Image
            source={require("../../assets/logo.png")} // path to your image
            style={{
              marginBottom: "10%",
              width: "100%", // Set the desired width
              height: "8%", // Set the desired height
              resizeMode: "contain", // Ensure the image is scaled without distortion
            }}
          />
          {/* Header - Sign In */}
          <Text style={styles.titleText}>SIGN IN</Text>

          {/* Tab Selection */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "designer" && styles.activeTab,
              ]}
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

          {/* Username and Password Fields */}
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
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SignUp", {
                selectedTab: selectedTab,
              })
            }
          >
            <Text style={styles.linkText}>
              DON'T HAVE AN ACCOUNT?{" "}
              <Text style={[styles.linkText, { color: "black" }]}>SIGN UP</Text>
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </BackgroundWrapper>
    )
  );
}
