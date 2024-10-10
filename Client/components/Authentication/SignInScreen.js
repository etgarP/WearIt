import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "./AuthenticationStyles";

export default function SignInScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Stylist");

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
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>DON'T HAVE AN ACCOUNT? SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
