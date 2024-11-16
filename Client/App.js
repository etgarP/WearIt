import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './components/appNavigation/appNavigator';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
    );
}
const Stack = createStackNavigator();

// export default function App() {
//   const [questionnaireData, setQuestionnaireData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     allergies: "",
//     work: "",
//     city: "",
//     religion: "",
//     image: null,
//     measurements: {
//       shoulders: "",
//       bust: "",
//       waist: "",
//       hips: "",
//       thighs: "",
//       calves: "",
//       legs: "",
//     },
//     other: "",
//     price: null,
//     specialization: "",
//     stylistAbout: "",
//   });

//   return (
//     <NavigationContainer>

//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
