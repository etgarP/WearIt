import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import AppNavigator from "./components/appNavigation/appNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    kalam: require("./assets/fonts/Kalam-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Optionally show a loading spinner
  }

  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

