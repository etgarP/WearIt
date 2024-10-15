import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { styles } from "./AuthenticationStyles";

export default function SignUpScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("Stylist");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Update selectedTab only when route.params.selectedTab changes
  useEffect(() => {
    if (route.params?.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params?.selectedTab]);

  // Validation for sign-up with trimming and length checks
  const handleSignUp = () => {
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

    // Proceed with sign-up logic (e.g., API call)
    Alert.alert("Success", `Account created for ${trimmedUsername}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Sign Up */}
      <Text style={styles.titleText}>SIGN UP</Text>

      {/* Tab Selection */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "Stylist" && styles.activeTab]}
          onPress={() => setSelectedTab("Stylist")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Stylist" && styles.activeTabText,
            ]}
          >
            STYLIST
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "Customer" && styles.activeTab]}
          onPress={() => setSelectedTab("Customer")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Customer" && styles.activeTabText,
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SignIn", { selectedTab: selectedTab })
        }
      >
        <Text style={styles.linkText}>ALREADY HAVE AN ACCOUNT? SIGN IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
