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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ navigation, route }) {
    const [selectedTab, setSelectedTab] = useState("designer");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");
    // Update selectedTab only when route.params.selectedTab changes
    useEffect(() => {
        if (route.params?.selectedTab) {
            setSelectedTab(route.params.selectedTab);
        }
    }, [route.params?.selectedTab]);
    useEffect(() => {
        setUrl(`http://10.0.2.2:12345/api/${selectedTab}/auth/signin`);
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
                console.log("Data sent successfully:", responseData);

                //TODO Update token
                await AsyncStorage.setItem("userToken", responseData.key);

                // Navigate to the next screen
                navigation.navigate("Home"); // Replace "Home" with the actual next screen name
            } else {
                console.error("Error sending data:", response.statusText);
                Alert.alert(
                    "Error",
                    "Failed to sign in. Please try again later."
                );
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
                    style={[
                        styles.tab,
                        selectedTab === "designer" && styles.activeTab,
                    ]}
                    onPress={() => setSelectedTab("designer")}>
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === "designer" && styles.activeTabText,
                        ]}>
                        STYLIST
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        selectedTab === "client" && styles.activeTab,
                    ]}
                    onPress={() => setSelectedTab("client")}>
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === "client" && styles.activeTabText,
                        ]}>
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
                    navigation.navigate("SignUpScreen", {
                        selectedTab: selectedTab,
                    })
                }>
                <Text style={styles.linkText}>
                    DON'T HAVE AN ACCOUNT? SIGN UP
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
