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
import { constants } from "../../constants/api";
import BackgroundWrapper from "../backgroundWrapper";
import { sendRegisterRequest } from "./apiService";
import { Strings } from "../../constants/strings";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Validation for sign-up with trimming and length checks
  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedUsername) {
      Alert.alert(Strings.alertTitleError, Strings.alertUsernameEmpty);
      return;
    }
    if (!trimmedPassword) {
      Alert.alert(Strings.alertTitleError, Strings.alertPasswordEmpty);
      return;
    }
    if (trimmedUsername.length > 14) {
      Alert.alert(Strings.alertTitleError, Strings.alertUsernameTooLong);
      return;
    }
    if (trimmedPassword.length > 14) {
      Alert.alert(Strings.alertTitleError, Strings.alertPasswordTooLong);
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert(Strings.alertTitleError, Strings.alertPasswordMismatch);
      return;
    }

    const authenticationInfo = {
      username,
      password,
    };
    const responseData = await sendRegisterRequest(authenticationInfo, url);
    if (responseData == null) {
      return;
    }
    await AsyncStorage.setItem("userToken", responseData.key);
    await AsyncStorage.setItem("selectedTab", selectedTab);
    setUserDetails({
      token: responseData.key,
    });

    selectedTab == "designer"
      ? navigation.replace("stylistQuestionnaire")
      : navigation.replace("clientQuestionnaire");
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
        <Text style={styles.titleText}>{Strings.signup}</Text>

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

        {/* Username, Password, and Confirm Password Fields */}
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
          <TextInput
            style={styles.input}
            placeholder={Strings.confirmPasswordPlaceholder}
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
          <Text style={styles.buttonText}>{Strings.signup}</Text>
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
            {Strings.alreadyHaveAnAccount}{" "}
            <Text style={[styles.linkText, { color: "black" }]}>
              {Strings.signin}
            </Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundWrapper>
  );
}
