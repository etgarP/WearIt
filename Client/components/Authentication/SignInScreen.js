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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppObjectContext } from "../appNavigation/appObjectProvider";
import { constants } from "../../constants/api";
import BackgroundWrapper from "../backgroundWrapper";
import { sendLoginRequest } from "./apiService";
import { Strings } from "../../constants/strings";

export default function SignInScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("designer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isNotSignedInAlready, setIsNotSignedInAlready] = useState(false);
  const { setUserDetails } = useContext(AppObjectContext);

  // Get user details from the cookies
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
        setIsNotSignedInAlready(true);
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

  // Validation for sign-in with trimming and length checks
  const handleSignIn = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) {
      Alert.alert(Strings.alertTitleError, Strings.alertEnterUsername);
      return;
    }
    if (!trimmedPassword) {
      Alert.alert(Strings.alertTitleError, Strings.alertEnterPassword);
      return;
    }
    if (trimmedUsername.length > 80) {
      Alert.alert(Strings.alertTitleError);
      return;
    }
    if (trimmedPassword.length > 80) {
      Alert.alert(Strings.alertTitleError);
      return;
    }
    const authenticationInfo = {
      username,
      password,
    };
    const responseData = await sendLoginRequest(
      authenticationInfo,
      url,
    );

    if (responseData == null) {
      return;
    }
    
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
  };

  return (
    isNotSignedInAlready && (
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
          <Text style={styles.titleText}>{Strings.signin}</Text>

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
                {Strings.stylist}
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
                {Strings.customer}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Username and Password Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={Strings.usernamePlaceholder}
              placeholderTextColor="#A9A9A9"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder={Strings.passwordPlaceholder}
              placeholderTextColor="#A9A9A9"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>{Strings.signin}</Text>
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
              {Strings.newAccountQuestion}{" "}
              <Text style={[styles.linkText, { color: "black" }]}>
                {Strings.signup}
              </Text>
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </BackgroundWrapper>
    )
  );
}
