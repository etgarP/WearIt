import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "./AuthenticationStyles";

export default function SignUpScreen() {
  const [selectedTab, setSelectedTab] = useState("Stylist");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Sign UP */}
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
        <TextInput
          style={styles.input}
          placeholder="CONFIRM PASSWORD"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <TouchableOpacity>
        <Text style={styles.linkText}>ALREADY HAVE AN ACCOUNT? SIGN IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
