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

export default function SignInScreen({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState("Stylist");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Update selectedTab only when route.params.selectedTab changes
  useEffect(() => {
    if (route.params?.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params?.selectedTab]);

  // Validation for sign-in with trimming and length checks
  const handleSignIn = () => {
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
    if (trimmedUsername.length > 14) {
      Alert.alert("Error", "Username cannot exceed 14 characters.");
      return;
    }
    if (trimmedPassword.length > 14) {
      Alert.alert("Error", "Password cannot exceed 14 characters.");
      return;
    }

    // Proceed with sign-in logic (e.g., API call)
    Alert.alert("Success", `Welcome, ${trimmedUsername}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Sign In */}
      <Text style={styles.titleText}>SIGN IN</Text>

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
          navigation.navigate("SignUp", { selectedTab: selectedTab })
        }
      >
        <Text style={styles.linkText}>DON'T HAVE AN ACCOUNT? SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
