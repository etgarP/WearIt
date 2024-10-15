import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Questionnaire1 from "./components/Questionnaire/Questionnaire_1";
import Questionnaire2 from "./components/Questionnaire/Questionnaire_2";
import Questionnaire3 from "./components/Questionnaire/Questionnaire_3";
import Questionnaire4 from "./components/Questionnaire/Questionnaire_4";
import Questionnaire5 from "./components/Questionnaire/Questionnaire_5";
import SignInScreen from "./components/Authentication/SignInScreen";
import SignUpScreen from "./components/Authentication/SignUpScreen";


const Stack = createStackNavigator();

// Define the HomeScreen component
function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        kalam: require("./assets/fonts/Kalam-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text>Welcome to the Home Screen</Text>
            <Button
                title="Go to Questionnaire"
                onPress={() => navigation.navigate("Questionnaire1")}
            />
            <StatusBar style="auto" />
        </View>
    );
}

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={SignInScreen} />
          <Stack.Screen name="Questionnaire1" component={Questionnaire1} />
          <Stack.Screen name="Questionnaire2" component={Questionnaire2} />
          <Stack.Screen name="Questionnaire3" component={Questionnaire3} />
          <Stack.Screen name="Questionnaire4" component={Questionnaire4} />
          <Stack.Screen name="Questionnaire5" component={Questionnaire5} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
