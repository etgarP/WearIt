import { PaperProvider } from 'react-native-paper';
import AppNavigator from './components/appNavigation/appNavigator';
import React from "react";
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

